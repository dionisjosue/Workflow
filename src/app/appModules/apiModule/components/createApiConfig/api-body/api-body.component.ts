import { Component, OnInit } from '@angular/core';
import { PropertyInfo } from '../json-props/PropertyInfo';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { FieldService } from '@field/services/field.service';
import { Field } from '@field/classes/Field';
import { PropertyInfoService } from '@api/services/property-info.service';

@Component({
  selector: 'app-api-body',
  templateUrl: './api-body.component.html',
  styleUrls: ['./api-body.component.css']
})
export class ApiBodyComponent implements OnInit{

  propertyNames:PropertyInfo;
  editorOptions:JsonEditorOptions;
  data:any;
  fields:Field[];
  fileUploaded:string = 'UPLOAD JSON';

  
  constructor(private fdSv:FieldService,
    private propInfo:PropertyInfoService){
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.ajv =  { 
      allErrors: true, 
      verbose: true,
      jsonPointers: false,
      $data: true
    };
    this.editorOptions.modes = ['code', 'text', 'tree', 'view','form']; // set all allowed modes
    this.editorOptions.mode = 'code'; //set only one mode
    this.propertyNames = this.extractProperties(this.data);
  }
  ngOnInit(): void {
    this.getFields();
  }

  extractProperties(json: any): PropertyInfo {
    return this.propInfo.getPropertiesRecursively(json, 'Root');
  }

  getFields(){
    this.fdSv.getData(null).subscribe({
      next:(data)=>{
        if(data.result.success){
          this.fields = data.items;
        }
      }
    })
  }
  uploadJson(event){
    const fileInput = event.target;
    var self = this;
    if (fileInput.files.length > 0) {
      this.fileUploaded = fileInput.files[0].name;

      const fileReader = new FileReader();
      let content = '';
      fileReader.onload = (e) => {
        content = e.target.result as string; 
        self.data = JSON.parse(content);
        this.propertyNames = this.extractProperties(this.data);
        this.propertyNames.jsonText = JSON.parse(content);
        this.propInfo.setRootPropertyInfo(this.propertyNames);
      };
      fileReader.readAsText(fileInput.files[0]);

    } 
    else {
      this.fileUploaded = 'CARGAR JSON';
      this.propertyNames = null;
    }
  }



}
