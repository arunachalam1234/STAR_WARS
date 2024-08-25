import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/Loader.service';

@Component({
  selector: 'app-Loader',
  templateUrl: './Loader.component.html',
  styleUrls: ['./Loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(
    private loaderSrv: LoaderService
  ) { }

  ngOnInit() {
  }

  canShowLoader(){
    return this.loaderSrv.loadCount > 0;
  }

}
