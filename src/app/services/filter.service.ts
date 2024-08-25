import { Injectable, signal, WritableSignal } from '@angular/core';
import { CATEGORIES, CATEGORY_TO_PROP, CATEGORY_TO_SEARCHPROP, DEFAULT_FILTER_QUERY, INITIAL_FILTER_SELECTION, SEARCHABLE_COLUMNS } from '../const/const';
import { AppDataService } from './app-data.service';
import { filmModel, filteroptionModel, filterQueryModel, PeopleModel, speciesModel, starshipModel, vehicleModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterQuery: WritableSignal<filterQueryModel> = signal(DEFAULT_FILTER_QUERY);
  originalFilterOptionsData: {[key:string]: filteroptionModel[]} = INITIAL_FILTER_SELECTION;
  filteredData: WritableSignal<PeopleModel[]> = signal([]);

  constructor(
    private dataSrv: AppDataService
  ) { }

  filterBySearchText(list: PeopleModel[]){
    let searchText = this.filterQuery().search?.trim();
    if(searchText){
      return list.filter(item => {
        return SEARCHABLE_COLUMNS.some(col => {
          if(col == 'species') return item?.speciesData?.name?.toLowerCase()?.includes(searchText.toLowerCase());
          return item[col]?.toLowerCase()?.includes(searchText.toLowerCase())
        })
      })
    }
    return list;
  }

  filterByMultiSelect(list: PeopleModel[], searchList: filteroptionModel[], sourceColumn: string, prop: string){
    if(searchList && searchList.length >0){

      return list.filter(item => {
        if(sourceColumn == 'speciesData'){
          console.log(item[sourceColumn])
          return searchList.some(sel => sel.content == (item[sourceColumn]? item[sourceColumn][prop]: ''))
        }
        if(sourceColumn == 'birth_year'){
          return searchList.some(sel => sel.content == item[sourceColumn])
        }
        console.log(item[sourceColumn])
        return searchList.some(sel => item[sourceColumn]?.find((itemProp: any) => itemProp[prop] == sel.content))
      })
    }
    return list;
    
  }

  setFilteredData(){
    let filteredData = this.dataSrv.allPeoples();
    filteredData = this.filterBySearchText(filteredData);
    for(let key of CATEGORIES){
      filteredData = this.filterByMultiSelect(filteredData, this.filterQuery()[key], CATEGORY_TO_PROP[key], CATEGORY_TO_SEARCHPROP[key])
    }
    this.filteredData.set(filteredData);
  }

  prepareFilterOptionsData(){
    const prepareListBySourceList = (list: (PeopleModel|vehicleModel|speciesModel|starshipModel|filmModel)[], contentProp:string, filterOptionsProp: string) => {
      let optionsList: filteroptionModel[] = []
      list.forEach(item => {
        let option = {
          id: item.id,
          content: item[contentProp],
          selected: false
        }
        if(!(optionsList.find(opt => opt.content==option.content))) optionsList.push(option);
      })

      optionsList.sort((a,b) => a.content.localeCompare(b.content, undefined, {numeric: true, sensitivity: 'base'}));
      this.originalFilterOptionsData[filterOptionsProp] = optionsList;
    }
    prepareListBySourceList(this.dataSrv.allFilms(), 'title', 'movies');
    prepareListBySourceList(this.dataSrv.allVehicles(), 'name', 'vehicles');
    prepareListBySourceList(this.dataSrv.allSpecies(), 'name', 'species');
    prepareListBySourceList(this.dataSrv.allStarShips(), 'name', 'starShips');
    prepareListBySourceList(this.dataSrv.allPeoples(), 'birth_year', 'birthYear');
    this.originalFilterOptionsData = {...this.originalFilterOptionsData};
  }

}
