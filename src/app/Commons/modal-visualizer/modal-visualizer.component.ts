import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-visualizer',
  templateUrl: './modal-visualizer.component.html',
  styleUrls: ['./modal-visualizer.component.css']
})
export class ModalVisualizerComponent {

  @Input()title:string;
  @Input()imageUrl:string;
  @ViewChild("modalVisualizer")modal:ElementRef;


  constructor(private modalsv:NgbModal){

  }

  onClose(){
    this.modalsv.dismissAll();

  }
  open(){
    this.modalsv.open(this.modal,{
        size:'lg',
        backdrop:'static',
        animation:true
    });
  }
}
