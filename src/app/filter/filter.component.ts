import { Component, Input, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { CATEGORIES, CATEGORY_HEADERS, DEFAULT_FILTER_QUERY, INITIAL_FILTER_SELECTION } from '../const/const';
import { FilterService } from '../services/filter.service';
import * as _ from 'lodash';
import { filteroptionModel, filterQueryModel } from '../models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filterApplied = false;
  filterQuery: WritableSignal<filterQueryModel>= signal(DEFAULT_FILTER_QUERY);

  @Input() filteroptionsData: {[key: string]: filteroptionModel[]} = INITIAL_FILTER_SELECTION;

  initialSelectionIds: {[key: string]: number[]} = {}
  selectedCategory: string = 'movies';
  categories: string[] = CATEGORIES;
  categoryHeading: {[key: string]: string} = CATEGORY_HEADERS

  constructor(
    private filterSrv: FilterService
  ) { }

  ngOnInit() {
    this.filterQuery = this.filterSrv.filterQuery;
  }

  isActiveFilter(category: string){
    return this.filteroptionsData[category]?.filter(opt  => opt.selected)?.length > 0;
  }

  anyActiveFilter(){
    for(let key of this.categories){
      let isActive = this.filteroptionsData[key]?.filter(opt  => opt.selected)?.length > 0;
      if(isActive) return true;
    }

    return false;
  }

  isDirty(){
    for(let key of this.categories){
      let initial =  this.initialSelectionIds[key];
      let current = this.filteroptionsData[key]?.filter(opt => opt.selected);
      if(current?.length != initial?.length) return true;
      if(!current?.every(opt => initial.includes(opt.id))) return true;
    }
    return false;
  }

  onCheckboxClicked(checked: boolean, option: filteroptionModel){
    option.selected = checked;
  }

  applyFilter(filterPopOver: any){
    this.filterApplied = true;
    let query = this.filterQuery();
    for(let key of this.categories){
      query[key] = this.filteroptionsData[key].filter(opt=> opt.selected);
    }
    this.filterQuery.set(query);
    this.filterSrv.setFilteredData();
    filterPopOver?.close();
  }

  resetFilter(){
    for(let key of this.categories){
      this.filteroptionsData[key].forEach(option=> {
        option.selected = false;
      })
    }
  }

  changeSelection(category: string){
    if(category == this.selectedCategory) return;
    this.selectedCategory = category;
  }

  onPopupClose(){
    if(!this.filterApplied){
      for(let key of this.categories){
        this.filteroptionsData[key].forEach(option=> {
          option.selected = this.initialSelectionIds[key].includes(option.id);
        })
      }
    }
  }

  onOpenPopup(){
    this.filterApplied = false;
    for(let key of this.categories){
      this.initialSelectionIds[key] = this.filteroptionsData[key].filter(opt=> opt.selected).map(opt => opt.id);
    }
  }

}
