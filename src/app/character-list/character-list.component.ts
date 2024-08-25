import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { AppDataService } from '../services/app-data.service';
import { COLUMN_HEADERS, LIST_COLUMNS } from '../const/const';
import { Router } from '@angular/router';
import { LoaderService } from '../services/Loader.service';
import { PeopleModel } from '../models';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  columns: string[] = LIST_COLUMNS;
  columnHeaders:{[key: string]: string} = COLUMN_HEADERS;
  public characters: WritableSignal<PeopleModel[]> = signal([]);
  constructor(
    private appDataSrv: AppDataService,
    private filterSrv: FilterService,
    private router: Router,
    private loaderSrv: LoaderService
  ) { }

  async ngOnInit() {
    ++this.loaderSrv.loadCount;
    if(!(this.appDataSrv.allPeoples().length > 0)){
      await this.appDataSrv.fetchAndProcessAllData();
      this.filterSrv.setFilteredData();
      this.filterSrv.prepareFilterOptionsData();
    }
    this.characters = this.filterSrv.filteredData;
    --this.loaderSrv.loadCount;
  }

  getFilteroptionsData(){
    return this.filterSrv.originalFilterOptionsData;
  }

  getValue(col: string, item: any){
    if(col == 'species'){
      return item?.speciesData?.name ?? '--';
    }
    return item[col] ?? '--';
  }

  get searchValue(){
    return this.filterSrv.filterQuery().search;
  }

  set searchValue(value){
    this.filterSrv.filterQuery.update(val => {
      val.search = value;
      return val;
    })
  }

  onSearch(){
    this.filterSrv.setFilteredData();
  }

  clearSearch(){
    if(!this.searchValue) return;
    this.searchValue = null;
    this.onSearch();
  }

  onItemClick(item: any, id: number){
    this.appDataSrv.selectedCharacter = item;
    console.log(item)
    this.router.navigate(['character', id])
  }
}
