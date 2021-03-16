import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextpackListComponent } from './contextpack/contextpack-list.component';
import { WordPackComponent } from './wordpack/wordpack.component';
import { AddContextpackComponent } from './contextpack/add-contextpack.component';

const routes: Routes = [
  {path: '', component: ContextpackListComponent},
  {path: 'contextpacks', component: ContextpackListComponent},
  {path: 'contextpacks/:id', component: WordPackComponent },
  {path: 'contextpacks/new', component: AddContextpackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
