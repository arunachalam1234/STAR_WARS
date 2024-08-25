import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppDataService } from './app-data.service';
import { LoaderService } from './Loader.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterInfoResolver {

constructor(
  private dataSrv: AppDataService,
  private loaderSrv: LoaderService
) { }

async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  ++this.loaderSrv.loadCount;
  const id = route.params['id'];
  if(this.dataSrv.selectedCharacter){
    --this.loaderSrv.loadCount;
    return this.dataSrv.selectedCharacter;
  }
  if(id){
    let data = await this.dataSrv.fetchandProcessSelectedChanracter(id);
    --this.loaderSrv.loadCount;
    return data;
  }
  return null
}

}
