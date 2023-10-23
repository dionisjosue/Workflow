import { Component, OnInit, ViewChild } from '@angular/core';
import { AttachmentService } from '../services/attachment.service';
import { Attachment } from '../classes/Attachment';
import { modalInput } from 'src/app/alert-dialog/modalInput';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { AttachmentSteps } from '../classes/AttachmentSteps';
import { AttachmentStepService } from '../services/attachment-step.service';

@Component({
  selector: 'app-attachment',
  templateUrl: '../readAttachment/attachment.component.html',
  styleUrls: ['../readAttachment/attachment.component.css']
})
export class AttachmentComponent implements OnInit{
  
  attachments:Array<Attachment>;
  inputsDialog:modalInput
  @ViewChild('dialog') alertDialog:AlertDialogComponent;

  constructor(private attachSv:AttachmentService,
    private attachStepsV:AttachmentStepService){

  }

  ngOnInit(): void {
    this.getAttachments();
  }
  getAttachments(){
    let self = this;
    this.attachSv.getData(null).subscribe({
      next:(data)=>{
        if(data.success){
          this.attachments = data.items as Array<Attachment>;
        }
        else{
          self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'No se han podido obtener los datos');
          self.alertDialog.open();
        }
      },
      error:(err)=>{
        self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err));
        self.alertDialog.open();
      }
    })
  }
  changeStatusAttachment(attach:Attachment){
    let self = this;
    let data = new Array<Attachment>();
    attach.active = !attach.active;
    data.push(attach);
    this.attachSv.editData(data).subscribe({
      next:(data)=>{
        if(data.success){
          attach.lastModifiedDate = data.items[0].lastModifiedDate;
        }
        else{
          attach.active = !attach.active;
        }
      },
      error:(err)=>{
        self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err));
        self.alertDialog.open();
        attach.active = !attach.active;

      }
    })
  }
  changeStatusStepAttachment(stepAttachment:AttachmentSteps){
    let self = this;
    stepAttachment.active = !stepAttachment.active;
    let data = new Array<AttachmentSteps>();
    data.push(stepAttachment);

    this.attachStepsV.editData(data).subscribe({
      next:(data)=>{
        if(data.success){
          stepAttachment.lastModifiedDate = data.items[0].lastModifiedDate;
        }
      },
      error:(err)=>{
        self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err));
        self.alertDialog.open();
        stepAttachment.active = !stepAttachment.active;

      }
    })


  }

}
