import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { END_POINTS } from '../const/const';
import { firstValueFrom } from 'rxjs';
import { filmModel, PeopleModel, planetModel, speciesModel, starshipModel, vehicleModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  
  selectedCharacter: PeopleModel = null;

  allPeoples: WritableSignal<PeopleModel[]> = signal([]);
  allFilms: WritableSignal<filmModel[]>  = signal([]);
  allSpecies: WritableSignal<speciesModel[]>  = signal([]);
  allStarShips: WritableSignal<starshipModel[]>  = signal([]);
  allVehicles: WritableSignal<vehicleModel[]>  = signal([]);
  allPlanets:  WritableSignal<planetModel[]>  = signal([]); 

  constructor(
    private http: HttpClient
  ) { }

  async fetchAndProcessAllData(){
    await this.fetchAllFilms(END_POINTS.films);
    await this.fetchAllSpecies(END_POINTS.species);
    await this.fetchAllStarShips(END_POINTS.starships);
    await this.fetchAllVehicles(END_POINTS.vehicles);
    await this.fetchAllPlanets(END_POINTS.planets);
    await this.fetchAllPeoples(END_POINTS.people);
  }

  getIdByUrl(url: string){
    if(!url) return null;
    let splitUrl = url.split("/").filter(element => element);
    return Number(splitUrl[splitUrl.length-1]);
  }

  processPeopleData(character: any){
    const buildData = (property: string, initialValue: any, sourceProperty: string, list: any[]) => {
      character[property] = initialValue;
      character[sourceProperty].forEach((url: string) => {
        if(url){
          let id = this.getIdByUrl(url);
          let item = list.find((film: any) => film.id == id);
          if(item) {
            if(sourceProperty == 'species') character[property] = item;
            else character[property].push(item)
          }
        }
      })
    }

    buildData('filmsData', [], 'films', this.allFilms());
    buildData('vehiclesData', [], 'vehicles', this.allVehicles());
    buildData('starShipsData', [], 'starships', this.allStarShips());
    buildData('speciesData', {}, 'species', this.allSpecies());

    character['planetData'] = {};
    let planetId = this.getIdByUrl(character.homeworld);
    if(planetId) character['planetData'] = this.allPlanets().find(planet => planet.id == planetId);
  }

  async fetchAllPlanets(url: string){
    try{
      let planets: any = await firstValueFrom(this.http.get(url));
      if(planets.results){
        this.allPlanets.update(val => {
          val = val.concat(planets.results);
          return val;
        })
      }
      if(planets.next) await this.fetchAllPlanets(planets.next);
      else this.includeIdForList(this.allPlanets());
    }catch(error){
      console.log(error);
    }
  }

  async fetchAllPeoples(url: string){
    try{
      let peoples: any = await firstValueFrom(this.http.get(url));
      if(peoples.results){
        peoples.results.forEach((people: any) => {
          this.processPeopleData(people);
        })
        this.allPeoples.update(val => {
          val = val.concat(peoples.results);
          return val;
        })
      }
      if(peoples.next) await this.fetchAllPeoples(peoples.next);
      else this.includeIdForList(this.allPeoples());
    }catch(error){
      console.log(error);
    }
  }

  async fetchAllFilms(url: string){
    try{
      let films: any = await firstValueFrom(this.http.get(url));
      if(films.results){
        this.allFilms.update(val => {
          val = val.concat(films.results);
          return val;
        })
      }
      if(films.next) await this.fetchAllFilms(films.next);
      else this.includeIdForList(this.allFilms());
    }catch(error){
      console.log(error);
    }
  }

  async fetchAllStarShips(url: string){
    try{
      let starShips: any = await firstValueFrom(this.http.get(url));
      if(starShips.results){
        this.allStarShips.update(val => {
          val = val.concat(starShips.results);
          return val;
        })
      }
      if(starShips.next) await this.fetchAllStarShips(starShips.next);
      else this.includeIdForList(this.allStarShips());
    }catch(error){
      console.log(error);
    }
  }

  async fetchAllVehicles(url: string){
    try{
      let vehicles: any = await firstValueFrom(this.http.get(url));
      if(vehicles.results){
        this.allVehicles.update(val => {
          val = val.concat(vehicles.results);
          return val;
        })
      }
      if(vehicles.next) await this.fetchAllVehicles(vehicles.next);
      else this.includeIdForList(this.allVehicles());

    }catch(error){
      console.log(error);
    }
  }

  async fetchAllSpecies(url: string){
    try{
      let species: any = await firstValueFrom(this.http.get(url));
      if(species.results){
        this.allSpecies.update(val => {
          val = val.concat(species.results);
          return val;
        })
      }
      if(species.next) await this.fetchAllSpecies(species.next);
      else this.includeIdForList(this.allSpecies());

    }catch(error){
      console.log(error);
    }
  }

  includeIdForList(list: any[]){
    list.forEach((item,index) => {
      item.id = index+1;
    })
  }

  async fetchandProcessSelectedChanracter(id: number){

    const processCharacterData = async (apisProp: string, dataProp: string, initialData: any) => {
      this.selectedCharacter[dataProp] = initialData;
      if(apisProp == 'homeworld'){
        let url = this.selectedCharacter[apisProp];
        this.selectedCharacter[dataProp] = url ? await firstValueFrom(this.http.get(url)) : initialData;
        return;
      }

      for(let url of this.selectedCharacter[apisProp]??[]){
        if(apisProp == 'species'){
          this.selectedCharacter[dataProp] = await firstValueFrom(this.http.get(url));
        }
        else{
          this.selectedCharacter[dataProp].push(await firstValueFrom(this.http.get(url)))
        }
      }
    }
    const characterUrl = "https://swapi.dev/api/people/"+id+"/";
    this.selectedCharacter = await firstValueFrom(this.http.get(characterUrl));
    await processCharacterData('films', 'filmsData' ,[]);
    await processCharacterData('vehicles', 'vehiclesData', []);
    await processCharacterData('starships', 'starShipsData', []);
    await processCharacterData('species', 'speciesData', {});
    await processCharacterData('homeworld', 'planetData', {});
    return this.selectedCharacter;
   
  }

}
