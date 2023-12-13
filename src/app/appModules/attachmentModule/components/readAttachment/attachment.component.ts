import { Component, OnInit, ViewChild } from '@angular/core';
import { Attachment } from '@attachment/classes/Attachment';
import { AttachmentSteps } from '@attachment/classes/AttachmentSteps';
import { AttachmentStepService } from '@attachment/services/attachment-step.service';
import { AttachmentService } from '@attachment/services/attachment.service';
import { modalInput } from '@share/classes/modalInput';
import { statusApiResult } from '@share/classes/statusApiResult';
import { AlertDialogComponent } from '@share/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-attachment',
  templateUrl: '../readAttachment/attachment.component.html',
  styleUrls: ['../readAttachment/attachment.component.css']
})
export class AttachmentComponent implements OnInit{
  
  attachments:Array<Attachment>;
  inputsDialog:statusApiResult
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
        if(data.result.success){
          this.attachments = data.items as Array<Attachment>;
        }
        else{
          self.inputsDialog = data.result;
          self.alertDialog.open();
        }
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
        if(data.result.success){
          attach.lastModifiedDate = data.items[0].lastModifiedDate;
        }
        else{
          attach.active = !attach.active;
        }
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
        if(data.result.success){
          stepAttachment.lastModifiedDate = data.items[0].lastModifiedDate;
        }
      }
    })


  }

}
