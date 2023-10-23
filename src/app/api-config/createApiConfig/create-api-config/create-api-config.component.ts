import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiConfigServices } from '../../services/api-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Field } from 'src/app/field/classes/Field';
import { FieldService } from 'src/app/field/services/field.service';
import { Utilities } from 'src/app/Commons/classes/Utilities';
import { jsonProps } from '../../classes/jsonProps';

@Component({
  selector: 'app-create-api-config',
  templateUrl: './create-api-config.component.html',
  styleUrls: ['./create-api-config.component.css']
})
export class CreateApiConfigComponent implements OnInit{

  form:FormGroup;
  itemSelected:number;
  editorOptions:JsonEditorOptions;
  data:any;
  fields:Array<Field>;
  selectedItem: any;
  @ViewChild('jsonEditor') jsonEditorContainer: JsonEditorComponent;
  propertyNames:jsonProps[]
  lastId:number;

  constructor(private apiConfSv:ApiConfigServices,
    private fb:FormBuilder,private fdSv:FieldService)
  {
    this.getFields();

    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.ajv =  { 
      allErrors: true, 
      verbose: true,
      jsonPointers: false,
      $data: true
    };
    this.editorOptions.modes = ['code', 'text', 'tree', 'view','form']; // set all allowed modes
    this.editorOptions.mode = 'code'; //set only one mode
    this.data = {"products":[{"name":"car","product":[{"name":"honda","model":[{"id":"civic","name":"civic"},{"id":"accord","name":"accord"},{"id":"crv","name":"crv"},{"id":"pilot","name":"pilot"},{"id":"odyssey","name":"odyssey"}]}]}]}
    this.propertyNames = Utilities.extractNodes(this.data);
    console.log(this.propertyNames)
    //this.propertyNames = Utilities.setParentId(this.propertyNames);
    //let propertyNames = Utilities.groupBy(this.propertyNames,'parentId');
    //console.log(propertyNames);

    console.log(this.propertyNames);
    this.form = fb.group({
      name:['',Validators.required],
      url:['',Validators.required],
      description:['',null],
      jsonBody:['',null],
      jsonResponse:['',null],
      httpMethod:[0,Validators.required],
      authType:[0,Validators.required],
      fromQuery:[false,Validators.required],
      paramsValue:fb.array([]),
      headers:fb.array([]),
      apiConditionals:fb.array([])
    })
  }
  ngOnInit(): void {
  }
  onNgSelectChange(event) 
  {
    // Update JSONEditor content based on the selected item
    if (this.selectedItem) {
      const selectedJson = this.selectedItem.jsonData; // Assuming your ng-select options have a 'jsonData' property
      this.jsonEditorContainer.set(selectedJson);
    } else {
      // Handle the case when no item is selected
    }
  }

  setItem(val){
    this.itemSelected = val;
    if(val == 4){
      setTimeout(function(){ $(".jsoneditor-poweredBy").remove()},100);

    }
    console.log(this.fields)

  }

  getFields(){
    this.fdSv.getData(null).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.success){
          this.fields = data.items as Array<Field>;
          console.log(this.fields)
        }
      },
      error:(err)=>{

      }
    })
  }


}
