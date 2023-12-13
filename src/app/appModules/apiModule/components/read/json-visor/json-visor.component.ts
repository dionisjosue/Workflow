import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonEditorOptions } from 'ang-jsoneditor';


@Component({
  selector: 'app-json-visor',
  templateUrl: './json-visor.component.html',
  styleUrls: ['./json-visor.component.css']
})
export class JsonVisorComponent {

  @Input()data:any;
  @Output()close:EventEmitter<any>;
  editorOptions:JsonEditorOptions;

  @ViewChild("jsonVisor")modal:ElementRef;

  constructor(private modalsv:NgbModal){
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.ajv =  { 
      allErrors: true, 
      verbose: true,
      jsonPointers: false,
      $data: true
    };
    this.editorOptions.modes = ['code']; // set all allowed modes
    this.editorOptions.mode = 'code'; //set only one mode
    
  }
  onCloseVisor(){
    this.modalsv.dismissAll()
    this.close.emit(true);
  }
  open(){
    this.modalsv.open(this.modal,{
        size:'lg',
        backdrop:'static',
        animation:true
    });
  }
}
