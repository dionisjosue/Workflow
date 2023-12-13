import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertDialogComponent } from '@share/components/alert-dialog/alert-dialog.component';
import { modalInput } from '@share/classes/modalInput';
import { FieldService } from '@field/services/field.service';
import { Field } from '@field/classes/Field';
import { statusApiResult } from '@share/classes/statusApiResult';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit{


  fields:Array<Field>;
  modal:statusApiResult;
  @ViewChild('dialog')dialog:AlertDialogComponent;


  constructor(private sv:FieldService){
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
        if(data.result.success){
          self.modal.message = "El campo " + field.name + " ha sido " + (field.active ? 'activado' : 'desactivado');
          self.modal.title = "Cambio de Status";
        }
        else{
          this.modal = data.result;
        }
        this.dialog.open();
      }/*,
      error:(err)=>{
        self.modal.message = "Por favor contactar al administrador de la herramienta y enviarle este mensaje " + JSON.stringify(err);
        self.modal.title = "Ha Ocurrido algo Inesperado";
        self.modal.modalId = "alertId";
        this.dialog.open();
      }*/
    })
  }


  getFields(params){
    let self= this;
    this.sv.getData(params).subscribe({
      next:(data)=>{
        if(data.result.success){
          this.fields = data.items as Array<Field>;
        }
        else{
          this.modal = data.result;
        }
       
      }
    })
  }
  onCloseAlert(event){
    //this.dialog.onClose();
  }
  
}
