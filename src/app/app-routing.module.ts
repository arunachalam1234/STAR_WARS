import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { CharacterInfoResolver } from './services/chanracterInfoResolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch:"full",
    redirectTo: 'characters',
  },
  {
    path: 'characters',
    component: CharacterListComponent,
  },
  {
    
  path: 'character/:id',
  component: CharacterInfoComponent,
  resolve: {
    info: CharacterInfoResolver
  }
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
