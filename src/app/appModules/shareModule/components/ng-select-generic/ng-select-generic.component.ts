import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { callbackResult } from '@share/callbackResult';
import { Alert } from '@share/classes/Alert';
import { dataServiceInterface } from '@share/services/dataServiceInterface';

@Component({
  selector: 'app-ng-select-generic',
  templateUrl: './ng-select-generic.component.html',
  styleUrls: ['./ng-select-generic.component.css']
})
export class NgSelectGenericComponent implements OnInit{

  @Input()controlName:string;
  @Input()label:string;
  @Input()bind:string;
  @Input()dataService:dataServiceInterface<any>;
  @Input()params:any;
  @Input()name:string;
  @Input()items:Array<any>
  @Input()form:FormGroup;
  @Input() callback!: (data: any,alert:Alert) => callbackResult;


  @Output()close:EventEmitter<any> = new EventEmitter<any>();
  @Output()save:EventEmitter<any> = new EventEmitter<any>();
  @Output()change:EventEmitter<any> = new EventEmitter<any>();


  public copyList:Array<any>;
  alert:Alert;


  constructor(){
    this.alert = new Alert("info","",false,0,false);
    //this.items = this.items ?? new Array<any>();
   // this.copyList = new Array<any>();
 
  }
  ngOnInit(): void {
    this.getItems();
  }
  get getControl(){
    return this.form.get(this.controlName);
  }

  getItems(){
    if(!this.items){
      this.dataService.getData(this.params).subscribe({
        next:(data)=>{
          this.items = data.items as Array<any>
          this.copyList = data.items as Array<any>
  
        },
        error:(err)=>{
  
        }
      })
    }
    else{
      this.copyList = JSON.parse(JSON.stringify(this.items)) as Array<any>;
    }
   
  }
  saveData()
  {
    var modAdd = this.items.filter(t=> t.id == 0);
    this.items = this.items.filter(t=> t.id > 0);
    var self = this;
    if(modAdd.length > 0 )
    {
      var result = new callbackResult(true);
      if (this.callback) {
        result = this.callback(modAdd[0],this.alert);
        modAdd = result.data;
      }

      if(result.success)
      {
        this.dataService.saveData(modAdd).subscribe({
          next:(data)=>{
              if(data.result.success){
                let itms = data.items[0];
                self.items =  self.items.filter(t=> t.id != 0);
                self.items = self.items.concat(data.items as Array<any>);
                this.alert.shwBtn = false;
                this.alert.type = "success";
                this.alert.message = self.name + " GUARDADO CORRECTAMENTE";
                this.getControl.setValue(itms.id);
                self.save.emit(itms);
              }
              this.temporaryAlert(this);
          },
          error:(err)=>{

          }
        })
      }
      else{
        this.alert = result.alert;
        this.temporaryAlert(this);
      }
    }
  }
  temporaryAlert(self){
    setTimeout(function(){
      self.alert.show = false
    },5000)

  }
  refreshItems(){
    var tmp = this.items;
    this.items = new Array<any>();
    this.items = tmp.filter(t=> t.id > 0);
  }
  closeAlert(){
    this.alert.show = false;
    var exists = this.items.findIndex(t=> t.id == 0);
    if(exists > -1){
      this.items.splice(exists,1);
    }
    this.refreshItems();
    this.form.get(this.controlName).setValue(-1);
    this.close.emit(true);
  }
  callParentCallback(): void {
    if (this.callback) {
    }
  }
  checkChange(event){
    var name = event?.name ?? "";
    this.refreshItems();
    var exists = this.items.find(t=> t.name.toLowerCase().trim() == name.toLowerCase().trim())
    name = name.toUpperCase();

    if(exists == null && name.length > 0){
      this.alert.show = true;
      this.alert.shwBtn = true;
      this.alert.message = "¿Esta seguro que desea GUARDAR  " + this.name + " "+ name.toUpperCase() + "?"
      
      
      var item ={
        name,
        active:true,
        id:0
      };
      this.items.push(item);
      this.change.emit(item)
    }
    else
      this.change.emit(exists);

  }

}

