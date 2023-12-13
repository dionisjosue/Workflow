import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldComponent } from './components/field/field.component';
import { CreateFieldComponent } from './components/create-field/create-field.component';

const routes: Routes = 
[
  {
    path: '',
    component: FieldComponent,
  },
  { 
    path: 'create', component: CreateFieldComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class fieldRoutingModule { }
