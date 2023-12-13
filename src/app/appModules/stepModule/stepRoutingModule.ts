import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepComponent } from './components/step/step.component';
import { CreateStepComponent } from './components/createStep/create-step.component';

const routes: Routes = 
[
  {
    path: '',
    component: StepComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class stepRoutingModule { }
