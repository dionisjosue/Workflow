import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';
import { ShareDataService } from '@share/services/share-data.service';
import { apiConfiguration } from '../createApiConfig/create-api-config/apiConfiguration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-api-config',
  templateUrl: './detail-api-config.component.html',
  styleUrls: ['./detail-api-config.component.css']
})
export class DetailApiConfigComponent implements AfterViewInit,OnInit,OnDestroy{

  @ViewChild("detailApiModal")detailApiModal:ElementRef;
  @Input()currentItem:apiConfiguration;
  currentOpt:number;

  constructor(private modalSv:NgbModal){

  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
  }
  open(){
    this.modalSv.open(this.detailApiModal,{
      size:'lg',
      backdrop:'static',
      animation:true
    });
  }
  ngOnInit(): void {
    let self = this;
  }

  onCloseModal()
  {
    this.modalSv.dismissAll();
  }
  setItem(id:number){
    this.currentOpt = id;
  }

}
