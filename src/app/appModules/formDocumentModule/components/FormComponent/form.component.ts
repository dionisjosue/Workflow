import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form } from '@form/classes/Form';
import { FormFilter } from '@form/classes/FormFilter';
import { FormStep } from '@form/classes/FormStep';
import { FormStepService } from '@form/services/form-step.service';
import { FormService } from '@form/services/form.service';
import { GenericResponse } from '@share/classes/GenericResponse';
import { modalInput } from '@share/classes/modalInput';
import { statusApiResult } from '@share/classes/statusApiResult';
import { AlertDialogComponent } from '@share/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: '../FormComponent/form.component.html',
  styleUrls: ['../FormComponent/form.component.css']
})
export class FormComponent implements OnInit{

  forms:Array<Form>;
  inputsDialog:statusApiResult
  @ViewChild('dialog') alertDialog:AlertDialogComponent;
  
  constructor(private formSv:FormService,
    private formStepSv:FormStepService){

  }
  ngOnInit(): void {
    this.getForms(new FormFilter());
  }

 disableForm(item:Form){
    item.active = !item.active
    let data = new Array<Form>();
    let self = this;
    data.push(item);
    this.formSv.editData(data).subscribe({
      next:(data:GenericResponse<Form>)=>{
          if(data.result.success){

          }
          else{
            item.active = !item.active
            this.inputsDialog = data.result;
            self.alertDialog.open();
          }
      }
    })
 }
 changeStatus(formStep:FormStep){
  console.log(formStep);
    let steps = new Array<FormStep>();
    let self = this;
    formStep.active = !formStep.active;
    steps.push(formStep);
    this.formStepSv.editData(steps).subscribe({
      next:(data)=>{
        if(data.result.success){
          formStep.lastModifiedDate = (data.items[0] as FormStep).lastModifiedDate;
        }
        else{
          formStep.active = !formStep.active;
          self.inputsDialog = data.result;
          self.alertDialog.open();
        }
      },
    })
 }
  getForms(filters:FormFilter){
    let self = this;    
    this.formSv.getData(filters).subscribe({
      next:(data:GenericResponse<Form>)=>{
        
        if(data.result.success){
          this.forms = data.items as Array<Form>;
        }
        if(this.forms == undefined || this.forms.length <= 0){
        }
        else{
          this.inputsDialog = data.result;
        }
      }
    })
  }
}
