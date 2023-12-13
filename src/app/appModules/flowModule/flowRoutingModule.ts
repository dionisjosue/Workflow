import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowComponent } from './components/flow/flow.component';
import { CreatEditFlowComponent } from './components/creat-edit-flow/creat-edit-flow.component';

const routes: Routes = 
[
  {
    path: '',
    component: FlowComponent,
    /*children: [
      { path: 'create', component: CreatEditFlowComponent },
      { path: '', redirectTo: 'flow', pathMatch: 'full' },
    ],*/
  },
  {
    path:"create",
    component:CreatEditFlowComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class flowRoutingModule { }
