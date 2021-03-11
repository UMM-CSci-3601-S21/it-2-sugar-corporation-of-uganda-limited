import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContextPackComponent } from './contextpack/contextpack.component';



const routes: Routes = [
  {path: '', component: ContextPackComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
