import { Component } from '@angular/core';
import { PropertyInfo } from '../PropertyInfo';
import { JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-api-body',
  templateUrl: './api-body.component.html',
  styleUrls: ['./api-body.component.css']
})
export class ApiBodyComponent {

  propertyNames:PropertyInfo;
  editorOptions:JsonEditorOptions;
  data:any;

  
  constructor(){
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
    //this.propertyNames = Utilities.extractNodes(this.data);
    this.propertyNames = this.extractProperties(this.data);
  }

  extractProperties(json: any): PropertyInfo {
    return this.getPropertiesRecursively(json, 'Root');
  }



  private getPropertiesRecursively(obj: any, propName: string): PropertyInfo 
  {
    const propertyInfo: PropertyInfo = {
      propName,
      type: this.getPropertyType(obj),
    };

    if (Array.isArray(obj)) {
      propertyInfo.children = obj.map((item, index) =>
        this.getPropertiesRecursively(item, index.toString())
      );
    } else if (typeof obj === 'object' && obj !== null) {
      propertyInfo.children = Object.keys(obj).map((key) =>
        this.getPropertiesRecursively(obj[key], key)
      );
    } else {
      propertyInfo.value = obj;
    }

    return propertyInfo;
  }
  private getPropertyType(value: any): string {
    if (Array.isArray(value)) {
      return 'array';
    } else if (value !== null && typeof value === 'object') {
      return 'object';
    } else {
      return typeof value;
    }
  }

}
