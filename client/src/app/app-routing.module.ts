import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextpackListComponent } from './contextpack/contextpack-list.component';
import { WordPackComponent } from './wordpack/wordpack.component';

const routes: Routes = [
  {path: '', component: ContextpackListComponent},
  {path: 'contextpacks', component: ContextpackListComponent},
  {path: 'wordpacks', component: WordPackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
