import { filteroptionModel } from "../models";

export const END_POINTS = {
  "films": "https://swapi.dev/api/films/",
    "people": "https://swapi.dev/api/people/",
    "planets": "https://swapi.dev/api/planets/",
    "species": "https://swapi.dev/api/species/",
    "starships": "https://swapi.dev/api/starships/",
    "vehicles": "https://swapi.dev/api/vehicles/"
}

export const DEFAULT_FILTER_QUERY: {[key: string]: filteroptionModel[] | string} = {
  search: null,
  movies: [],
  species: [],
  vehicles: [],
  starShips: [],
  birthYear: []
}

export const INITIAL_FILTER_SELECTION: {[key:string]: filteroptionModel[]} ={
  movies: [],
  species: [],
  vehicles: [],
  starShips: [],
  birthYear: []
}

export const LIST_COLUMNS = ['index', 'name', 'species', 'height', 'birth_year', 'gender'];
export const SEARCHABLE_COLUMNS = ['name', 'species', 'height', 'birth_year', 'gender'];
export const SORTABLE_COLUMNS = ['name', 'species', 'height', 'birth_year', 'gender'];

export const COLUMN_HEADERS = {
  'index' : 'Sl.No', 
  'name': 'Character Name',
  'species': 'Species',
  'height': 'Height', 
  'birth_year': 'Birth Year', 
  'gender': 'Gender'
}

export const CATEGORIES = ['movies', 'species', 'vehicles', 'starShips', 'birthYear'];
export const CATEGORY_HEADERS = {
  'movies': 'Movies',
  'species': 'Species', 
  'vehicles': 'Vehicles', 
  'starShips': 'Starships', 
  'birthYear': 'BirthYear'
}

export const CATEGORY_TO_PROP: {[key: string]: string} = {
  'movies': 'filmsData',
  'species': 'speciesData', 
  'vehicles': 'vehiclesData', 
  'starShips': 'starShipsData', 
  'birthYear': 'birth_year'
}

export const CATEGORY_TO_SEARCHPROP: {[key: string]: string}  = {
'movies': 'title',
  'species': 'name', 
  'vehicles': 'name', 
  'starShips': 'name', 
  'birthYear': ''
}
