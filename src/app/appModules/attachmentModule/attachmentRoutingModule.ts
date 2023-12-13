import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttachmentComponent } from './components/readAttachment/attachment.component';
import { CreateAttachmentComponent } from './components/create-attachment/create-attachment.component';

const routes: Routes = 
[
  {
    path: '',
    component: AttachmentComponent,
  },
  { 
    path: 'create', component: CreateAttachmentComponent 
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class attachmentRoutingModule { }
