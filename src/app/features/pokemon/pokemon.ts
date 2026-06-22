import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { PokemonCard } from './components/pokemon-card/pokemon-card';
import { PokemonList } from './pages/pokemon-list/pokemon-list';

@NgModule({
  declarations: [PokemonCard, PokemonList],
  imports: [SharedModule],
  exports: [PokemonList]
})
export class PokemonModule {}