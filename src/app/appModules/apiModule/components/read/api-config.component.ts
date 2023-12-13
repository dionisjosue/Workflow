import { Component, OnInit, ViewChild } from '@angular/core';
import { apiConfiguration } from '../createApiConfig/create-api-config/apiConfiguration';
import { ApiConfigServices } from '@api/services/api-config.service';
import { ShareDataService } from '@share/services/share-data.service';
import { JsonVisorComponent } from './json-visor/json-visor.component';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';
import { DetailApiConfigComponent } from '../detail-api-config/detail-api-config.component';

@Component({
  selector: 'app-api-config',
  templateUrl: './api-config.component.html',
  styleUrls: ['./api-config.component.css']
})
export class ApiConfigComponent implements OnInit{

  apis:Array<apiConfiguration>;
  currentJson:string;
  selected:apiConfiguration;
  //@ViewChild('detailApiItm') detailComponent:DetailApiConfigComponent;
  //@ViewChild('conditionalsApi') condApiComponent:ConditionalApiComponent;
  @ViewChild('jsonVisor') jsonVisor:JsonVisorComponent;
  @ViewChild('detailApiComponent') detailApiComp:DetailApiConfigComponent;



  constructor(private apSv:ApiConfigServices,
    private shData:ShareDataComplexService){

  }

  ngOnInit(): void {
    this.getApiConfigs();
  }
  showJson(json){
    this.currentJson = JSON.parse(json);
    this.jsonVisor.open();
  }
  setCurrentItem(api:apiConfiguration)
  {
    console.log("data");
    this.selected = api;
    this.detailApiComp.open();
  }

  getApiConfigs()
  {
    let self = this;
    this.apSv.getData(null).subscribe({
      next(data){
        console.log(data);
        if(data.result.success){
          self.apis = data.items as Array<apiConfiguration>;
        }
      }
    })
  }
  showConditionals(api:apiConfiguration)
  {
   // this.condApiComponent.openModal(api);
  }



}
