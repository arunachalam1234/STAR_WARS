import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CharacterListComponent } from './character-list/character-list.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FilterComponent } from './filter/filter.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { LoaderComponent } from './Loader/Loader.component';

@NgModule({
  declarations: [				
    AppComponent,
      CharacterListComponent,
      FilterComponent,
      CharacterInfoComponent,
      LoaderComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    NgbPopoverModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
