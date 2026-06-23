
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  abilities: PokemonAbilitySlot[];
}

export interface PokemonSprites {
  front_default: string | null;
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonType;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  stat: PokemonStatInfo;
}

export interface PokemonStatInfo {
  name: string;
  url: string;
}

export interface PokemonAbilitySlot {
  slot: number;
  ability: PokemonAbility;
}

export interface PokemonAbility {
  name: string;
  url: string;
}

