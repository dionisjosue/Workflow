import { Component,ElementRef,EventEmitter,Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { modalInput } from '@share/classes/modalInput';
import { statusApiResult } from '@share/classes/statusApiResult';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

  constructor(private modalsv:NgbModal){
  }
  @Input()inputs:statusApiResult

  @Output()close:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("alertDialog")modal:ElementRef;

  onClose(){
    this.modalsv.dismissAll();

    this.close.emit(this.inputs);
  }
  open(){
    this.modalsv.open(this.modal,{
        size:'md',
        backdrop:'static',
        animation:true
    });
  }


}
