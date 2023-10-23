import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form } from '../Classes/Form';
import { FormService } from '../services/form.service';
import { FormFilter } from '../Classes/FormFilter';
import { modalInput } from '../../alert-dialog/modalInput';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { FormStep } from '../Classes/FormStep';
import { FormStepService } from '../services/form-step.service';
import { GenericResponse } from 'src/app/Commons/classes/GenericResponse';

@Component({
  selector: 'app-form',
  templateUrl: '../FormComponent/form.component.html',
  styleUrls: ['../FormComponent/form.component.css']
})
export class FormComponent implements OnInit{

  forms:Array<Form>;
  inputsDialog:modalInput
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
          if(data.success){

          }
          else{
            item.active = !item.active
            self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error al ' + (item.active ? 'desactivar': 'activar')+' el formulario ' + item.title);
            self.alertDialog.open();
          }
      },
      error:(err)=>{
        item.active = !item.active
        self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error al ' + (item.active ? 'desactivar': 'activar')+' el formulario ' +item.title
        + "detalles :" +JSON.stringify(err));
        self.alertDialog.open();
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
        if(data.success){
          formStep.lastModifiedDate = (data.items[0] as FormStep).lastModifiedDate;
        }
        else{
          formStep.active = !formStep.active;
          self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error al editar los datos');
          self.alertDialog.open();
        }
      },
      error:(err)=>{
        formStep.active = !formStep.active;
        self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema (VER ERROR) ' + JSON.stringify(err));
        self.alertDialog.open();
      }
      
    })
 }
  getForms(filters:FormFilter){
    let self = this;    
    this.formSv.getData(filters).subscribe({
      next:(data:GenericResponse<Form>)=>{
        
        if(data.success){
          this.forms = data.items as Array<Form>;
        }
        if(this.forms == undefined || this.forms.length <= 0){
         // self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleNoData,'No se ha encontrado datos en el sistema');
        }
      },
      error:(err)=>{
        self.inputsDialog = new modalInput('alertId',modalInput.getDataTitleError,'Ha ocurrido un error en el sistema');

        this.alertDialog.open();
      }
    })
  }
}
