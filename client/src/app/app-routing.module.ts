import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextpackListComponent } from './contextpack/contextpack-list.component';
import { ContextpackContentComponent} from './contextpack/contextpack-content.component';
import { AddContextpackComponent } from './contextpack/add-contextpack.component';
import { AddWordlistsComponent } from './add-wordlists/add-wordlists.component';

const routes: Routes = [
  {path: '', component: ContextpackListComponent},
  {path: 'contextpacks', component: ContextpackListComponent},
  {path: 'contextpacks/new', component: AddContextpackComponent },
  {path: 'contextpacks/:id', component: ContextpackContentComponent},
  {path: 'contextpacks/:id/wordpacks/new', component: AddWordlistsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
