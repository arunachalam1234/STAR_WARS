export interface PeopleModel {
  "birth_year"?: string | null;
  "films"?: string[];
  "gender"?: string | null;
  "hair_color"?: string | null;
  "height"?: string;
  "homeworld"?: string;
  "mass"?: string | null;
  "name"?: string;
  "skin_color"?: string;
  "created"?: string;
  "edited"?: string;
  "species"?: string[];
  "starships"?: string[];
  "url"?: string;
  id?: number;
  "vehicles"?: string[];
  filmsData?: filmModel[];
  speciesData?: speciesModel;
  starShipsData?: starshipModel[];
  vehiclesData?: vehicleModel[];
}

export interface filmModel {
  id?: number;
  "characters"?: string[];
  "director"?: string;
  "episode_id"?: number;
  "opening_crawl"?:  string;
  "planets"?: string[]
  "producer"?: string;
  "release_date"?: string;
  "title"?: string;
  "name"?: string;
  "created"?: string;
  "edited"?: string;
  "species"?: string[];
  "starships"?: string[];
  "url"?: string;
  "vehicles"?: string[];
}

export interface speciesModel {
  id?: number;
  "average_height"?: string;
  "average_lifespan"?: string;
  "classification"?: string;
  "designation"?: string;
  "eye_colors"?: string;
  "hair_colors"?: string;
  "people"?: string[];
  "skin_colors"?: string;
  "films"?: string[];
  "homeworld"?: string;
  "name"?: string;
  "created"?: string;
  "edited"?: string;
  "url"?: string;
}

export interface vehicleModel {
  id?: number;
  "vehicle_class"?: string;
  "MGLT"?: string;
  "cargo_capacity"?: string;
  "consumables"?: string;
  "cost_in_credits"?: string;
  "crew"?: string;
  "length"?: string;
  "manufacturer"?: string;
  "max_atmosphering_speed"?: string;
  "model"?: string;
  "passengers"?: string;
  "pilots"?: any[];
  "films"?: string[];
  "name"?: string;
  "created"?: string;
  "edited"?: string;
  "url"?: string;
}

export interface starshipModel {
  id?: number;
  "MGLT"?: string;
  "cargo_capacity"?: string;
  "consumables"?: string;
  "cost_in_credits"?: string;
  "crew"?: string;
  "hyperdrive_rating"?: string;
  "length"?: string;
  "manufacturer"?: string;
  "max_atmosphering_speed"?: string;
  "model"?: string;
  "passengers"?: string;
  "pilots"?: any[];
  "starship_class"?: string;
  "films"?: string[];
  "name"?: string;
  "created"?: string;
  "edited"?: string;
  "url"?: string;
}

export interface planetModel{
  id?: number;
  "climate"?: string;
  "created"?: string;
  "diameter"?: string;
  "edited"?: string;
  "films"?: string[];
  "gravity"?: string;
  "name"?: string;
  "orbital_period"?: string;
  "population"?: string;
  "residents"?: string[];
  "rotation_period"?: string;
  "surface_water"?: string;
  "terrain"?: string;
  "url"?: string;
}

export interface filteroptionModel{
  id: number;
  content: string;
  selected: boolean;
}

export interface characterInfoSection {
  header?: string;
  contents?: {
    value?: string;
    header?: string
  }[],
  isEmpty?: boolean;
}

export interface filterQueryModel {
  search?: string | null;
  movies?: filteroptionModel[];
  species?: filteroptionModel[];
  vehicles?: filteroptionModel[];
  starShips?: filteroptionModel[];
  birthYear?: filteroptionModel[];
}