import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { Router } from '@angular/router';
import { characterInfoSection, PeopleModel } from '../models';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.css']
})
export class CharacterInfoComponent implements OnInit {

  sections = ['personalInfo', 'speciesData', 'planetData']
  sectionData: {[key: string]: characterInfoSection} = {};
    
  public info: PeopleModel = null;
  constructor(
    private router: Router,
    private appDataSrv: AppDataService
  ) { }

  ngOnInit() {
    this.info = this.appDataSrv.selectedCharacter;
    this.buildLeftSectionData();
  }

  buildLeftSectionData(){
    this.sectionData = {
      'personalInfo': {
        header: 'Personal Info',
        contents: [
          {
            header: 'Birth year',
            value: this.info['birth_year'] ?? '--'
          },
          {
            header: 'Gender',
            value: this.info['gender'] ?? '--'
          },
          {
            header: 'Hair color',
            value: this.info['hair_color'] ?? '--'
          },
          {
            header: 'Height',
            value: this.info['height'] ?? '--'
          }
        ]
      }, 
      'speciesData': {
        header: 'Species Data',
        isEmpty: !(this.info?.species?.length > 0),
        contents: [
          {
            header: 'Name',
            value: this.info['speciesData']['name'] ?? '--'
          },
          {
            header: 'Classification',
            value: this.info['speciesData']['classification'] ?? '--'
          },
          {
            header: 'Designation',
            value: this.info['speciesData']['designation'] ?? '--'
          },
          {
            header: 'Average span',
            value: this.info['speciesData']['average_lifespan'] ?? '--'
          },
          {
            header: 'Average height',
            value: this.info['speciesData']['average_height'] ?? '--'
          },
          {
            header: 'Eye colors',
            value: this.info['speciesData']['eye_colors'] ?? '--'
          },
          {
            header: 'Hair colors',
            value: this.info['speciesData']['hair_colors'] ?? '--'
          },
          {
            header: 'Language',
            value: this.info['speciesData']['language'] ?? '--'
          }
        ]
      },
      'planetData': {
        header: 'Planet Data',
        isEmpty: !this.info.homeworld,
        contents: [
          {
            header: 'Name',
            value: this.info['planetData']['name'] ?? '--'
          },
          {
            header: 'Population',
            value: this.info['planetData']['population'] ?? '--'
          },
          {
            header: 'Gravity',
            value: this.info['planetData']['gravity'] ?? '--'
          },
          {
            header: 'Diameter',
            value: this.info['planetData']['diameter'] ?? '--'
          },
          {
            header: 'Climate',
            value: this.info['planetData']['climate'] ?? '--'
          },
          {
            header: 'Surface water',
            value: this.info['planetData']['surface_water'] ?? '--'
          },
          {
            header: 'Terrain',
            value: this.info['planetData']['terrain'] ?? '--'
          },
          {
            header: 'Orbital period',
            value: this.info['planetData']['orbital_period'] ?? '--'
          },
          {
            header: 'Rotation period',
            value: this.info['planetData']['rotation_period'] ?? '--'
          }
        ]
      }
    }
  }

  onBackClick(){
    this.router.navigate(['characters']);
  }

}
