import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


import { Pokemon, PokemonListResponse } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly listUrl = `${this.pokeApiBaseUrl}?limit=20&offset=0`;

  constructor(private readonly http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(this.listUrl).pipe(
      switchMap((listResponse: PokemonListResponse) => {
        const detailRequests: Observable<Pokemon>[] = listResponse.results.map((r: PokemonListResponse['results'][number]) =>
          this.http.get<Pokemon>(r.url)
        );


        return forkJoin(detailRequests);
      }),
      map((pokemons: Pokemon[]) => pokemons),
      catchError((err: unknown) => {
        return throwError(() => err);
      })

    );
  }
}

