import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/models';

@Component({
  selector: 'app-pokemon-card',
  standalone: false,
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCard {
  @Input({ required: true }) pokemon!: Pokemon;
}