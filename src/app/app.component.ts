import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/Loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'STAR_WARS';

  constructor(
    private loaderSrv: LoaderService,
    private cdr: ChangeDetectorRef
  ){}

  async ngOnInit(){
    
  }

  isLoaderActive(): boolean{
    return this.loaderSrv.loadCount > 0;
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
}
