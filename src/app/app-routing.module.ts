import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowComponent } from './flow/flow.component';
import { StepComponent } from './step/step.component';
import { CreatEditFlowComponent } from './creat-edit-flow/creat-edit-flow.component';
import { FieldComponent } from './field/field.component';
import { CreateFieldComponent } from './field/create-field/create-field.component';
import { FormComponent } from './form/FormComponent/form.component';
import { CreateFormComponent } from './form/create-form/create-form.component';
import { AttachmentComponent } from './attachment/readAttachment/attachment.component';
import { CreateAttachmentComponent } from './attachment/createAttachment/create-attachment/create-attachment.component';
import { TemplateComponent } from './template/template.component';
import { CreateTemplateComponent } from './template/create-template/create-template.component';
import { ApiConfigComponent } from './api-config/read/api-config.component';
import { CreateApiConfigComponent } from './api-config/createApiConfig/create-api-config/create-api-config.component';

const routes: Routes = 
[

  { path: '', redirectTo:"Flujo",pathMatch:'full'},
  { path: 'Flujo',
    component:FlowComponent
  },
  {path:'Flujo/Create',component:CreatEditFlowComponent},
  {path:'Campo',component:FieldComponent},
  {path:'Campo/Create',component:CreateFieldComponent},
  {path:'Forms',component:FormComponent},
  {path:'Forms/Create',component:CreateFormComponent},
  {path:'Adjuntos',component:AttachmentComponent},
  {path:'Adjuntos/Create',component:CreateAttachmentComponent},
  { path: 'Flujo/Create/:id', component: CreatEditFlowComponent },
  { path: 'Etapa',component:StepComponent},
  { path: 'Etapa/Create',component:StepComponent},
  { path: 'Etapa/Create/:id',component:StepComponent},
  { path: 'Templates',component:TemplateComponent},
  { path: 'Templates/Create',component:CreateTemplateComponent},
  { path: 'Api',component:ApiConfigComponent},
  { path: 'Api/Create',component:CreateApiConfigComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
