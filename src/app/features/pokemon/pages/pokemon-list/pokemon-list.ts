import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Pokemon } from '../../models/models';
import { PokemonService } from '../../../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  isLoading = false;
  hasError = false;

  limit = 20;
  offset = 0;

  searchTerm = '';
  isSearchMode = false;

  // Subject que recibe cada cambio del input de búsqueda
  private searchSubject = new Subject<string>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  private setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(500),          // espera 500ms después de la última tecla
        distinctUntilChanged(),     // evita repetir la misma búsqueda
        switchMap((term) => {
          if (!term.trim()) {
            this.isSearchMode = false;
            return [];
          }

          this.isLoading = true;
          this.hasError = false;
          this.isSearchMode = true;

          return this.pokemonService.getPokemonByName(term);
        })
      )
      .subscribe({
        next: (pokemon) => {
          this.isLoading = false;

          if (!this.isSearchMode) {
            // el usuario borró el texto: volvemos a la lista
            this.loadPokemons();
            return;
          }

          if (pokemon) {
            this.pokemons = [pokemon];
          } else {
            this.pokemons = [];
            this.hasError = true;
          }
        },
        error: () => {
          this.isLoading = false;
          this.hasError = true;
          this.pokemons = [];
        }
      });
  }

  // Se dispara cada vez que el usuario escribe en el input
  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.hasError = false;
    this.isSearchMode = false;

    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.isLoading = false;
        if (data.length === 0) {
          this.hasError = true;
        }
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  retry(): void {
    if (this.isSearchMode) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.loadPokemons();
    }
  }
}