import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowComponent } from './flow/flow.component';
import { StepComponent } from './step/step.component';
import { CreatEditFlowComponent } from './creat-edit-flow/creat-edit-flow.component';

const routes: Routes = 
[

  { path: '', redirectTo:"Flujo",pathMatch:'full'},
  { path: 'Flujo',
    component:FlowComponent
   
  },
  {path:'Flujo/Create',component:CreatEditFlowComponent},
  { path: 'Flujo/Create/:id', component: CreatEditFlowComponent },
  { path: 'Etapa',component:StepComponent},
  { path: 'Etapa/Create',component:StepComponent},
  { path: 'Etapa/Create/:id',component:StepComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
