import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldService } from './services/field.service';
import { Field } from './classes/Field';
import { modalInput } from '../alert-dialog/modalInput';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit{


  fields:Array<Field>;
  modal:modalInput;
  @ViewChild('dialog')dialog:AlertDialogComponent;


  constructor(private sv:FieldService){
    this.modal = new modalInput('','','');
  }
  ngOnInit(): void {
    this.getFields(null);
  }

  changeStatus(field:Field){
    field.active = !field.active;
    let data = new Array<Field>();
    data.push(field);
    let self = this;
    this.sv.editData(data).subscribe({
      next:(data)=>{
        if(data.success){
          self.modal.message = "El campo " + field.name + " ha sido " + (field.active ? 'activado' : 'desactivado');
          self.modal.title = "Cambio de Status";
          self.modal.modalId = "alertId";
         // this.dialog.open();
        }
      },
      error:(err)=>{
        self.modal.message = "Por favor contactar al administrador de la herramienta y enviarle este mensaje " + JSON.stringify(err);
        self.modal.title = "Ha Ocurrido algo Inesperado";
        self.modal.modalId = "alertId";
        this.dialog.open();
      }
    })
  }


  getFields(params){
    let self= this;
    this.sv.getData(params).subscribe({
      next:(data)=>{
        if(data.success){
          this.fields = data.items as Array<Field>;
        }
       
      },
      error:(err)=>
      {
        self.modal.message = "Por favor contactar al administrador de la herramienta y enviarle este mensaje " + JSON.stringify(err);
        self.modal.title = "Ha Ocurrido algo Inesperado";
        self.modal.modalId = "alertId";
        this.dialog.open();
      }
    })
  }
  onCloseAlert(event){
    //this.dialog.onClose();
  }
  
}
