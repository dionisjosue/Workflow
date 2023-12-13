import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {path:'',redirectTo:"/flow",pathMatch:'full'},
  {path:'flow',loadChildren: () => import('@flow/flowModule').then(m=> m.flowModule)},
  {path:'field',loadChildren: () => import('@field/fieldModule').then(m=> m.FieldModule)},
  {path:'step',loadChildren: () => import('@step/stepModule').then(m=> m.stepModule)},
  {path:'form',loadChildren: () => import('@form/formDocumentModule').then(m=> m.FormDocumentModule)},
  {path:'attachment',loadChildren: () => import('@attachment/attachmentModule').then(m=> m.attachmentModule)},
  {path:'api',loadChildren: () => import('@api/apiModule').then(m=> m.apiModule)},
  {path:'template',loadChildren: () => import('@template/templateModule').then(m=> m.templateModule)},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
