import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './components/template/template.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';

const routes: Routes = 
[
  {
    path: '',
    component: TemplateComponent,
  },
  { 
    path: 'create', component: CreateTemplateComponent 
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class templateRoutingModule { }
