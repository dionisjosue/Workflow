import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { apiConfiguration } from '../classes/apiConfiguration';
import { ApiConfigServices } from '../services/api-config.service';
import { apiConditionals } from '../classes/apiConditionals';
import { ShareDataService } from 'src/app/Commons/share-data.service';
import { DetailApiConfigComponent } from '../detail-api-config/detail-api-config.component';
import { ConditionalApiComponent } from '../conditional-api/conditional-api.component';

@Component({
  selector: 'app-api-config',
  templateUrl: './api-config.component.html',
  styleUrls: ['./api-config.component.css']
})
export class ApiConfigComponent implements OnInit,AfterViewInit{

  apis:Array<apiConfiguration>;

  @ViewChild('detailApiItm') detailComponent:DetailApiConfigComponent;
  @ViewChild('conditionalsApi') condApiComponent:ConditionalApiComponent;


  constructor(private apSv:ApiConfigServices,
    private shData:ShareDataService){

  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getApiConfigs();
  }

  getApiConfigs(){
    this.apSv.getData(null).subscribe({
      next(data){
        if(data.success){
          this.apis = data.items;
        }
      },
      error(err){
      }
    })
  }
  showConditionals(api:apiConfiguration)
  {
    this.condApiComponent.openModal(api);
  }
  detailApi(api:apiConfiguration)
  {

  }


}
