import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/FormComponent/form.component';
import { CreateFormComponent } from './components/create-form/create-form.component';

const routes: Routes = 
[
  {
    path: '',
    component: FormComponent,
  },
  { 
    path: 'create', component: CreateFormComponent 
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class formRoutingModule { }
