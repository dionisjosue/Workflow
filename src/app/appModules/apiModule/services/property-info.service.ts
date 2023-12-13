import { Injectable } from '@angular/core';
import { apiFields } from '@api/classes/apiFields';
import { PropertyInfo } from '@api/components/createApiConfig/json-props/PropertyInfo';

@Injectable({
  providedIn: 'root'
})
export class PropertyInfoService 
{
  private rootPropertyInfo: PropertyInfo;
  public propUpdate:boolean;

  getRootPropertyInfo(): PropertyInfo {
    return this.rootPropertyInfo;
  }
  setRootPropertyInfo(rootPropertyInfo: PropertyInfo): void {
    this.rootPropertyInfo = rootPropertyInfo;
  }
  updatePropertyInfo(updatedPropertyInfo: PropertyInfo): void {
    this.rootPropertyInfo = updatedPropertyInfo;
  }
  ParsePropertyInfoToApiFields(_apiconfigFk:number):apiFields[]{
    let fd = new Array<apiFields>();
    if(this.rootPropertyInfo)
    {

      fd = this.buildPropsFields(this.rootPropertyInfo,_apiconfigFk);
    }
    return fd;
  }
  buildPropsFields(data:PropertyInfo,
    _apiConfigFk:number){

     
      let result: apiFields[] = [];
      if(data.propName != 'Root'&& 
      isNaN(Number(data.propName)))
      {
        let fd = new apiFields(_apiConfigFk,data.propName,data.valueMapped,data.fieldMapped);
        result.push(fd);
      } 

      if (data.children) {
        for (const child of data.children) {
          result = result.concat(this.buildPropsFields(child,_apiConfigFk));
        }
      }
      return result;
  }
  updateValue(obj: any, propToMatch: string, valueToMatch: any, newValue: any,rootNumber:number,nm:number = 0): void {
    nm += 1
    if(this.propUpdate)
    {
      return;
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) 
      {
        if (key === propToMatch && obj[key] === valueToMatch && nm ==rootNumber ) {
          obj[key] = newValue;
          this.propUpdate = true;
          return;
        }
        else if(typeof obj[key] === 'object' && key == propToMatch && nm == rootNumber){
          obj[key].field_object = newValue
          this.propUpdate = true;
          return;
        } 
        else if (typeof obj[key] === 'object') {
          this.updateValue(obj[key], propToMatch, valueToMatch, newValue,rootNumber, nm);
        }
      }
    }
  }
  validateField(val):boolean{
    return val == null || val == 0;
  }
  validatePropsAreAllMapped(data:PropertyInfo):boolean
  {
      if (data == null ||  (data.propName != 'Root' && 
      isNaN(Number(data.propName)) && ((!data.fieldMapped || data.fieldMapped == 0)  && !data.valueMapped))) {
        return false;
      }
    
      if (data.children) {
        // If there are children, recursively validate each child
        for (const child of data.children) {
          if (!this.validatePropsAreAllMapped(child)) {
            // If any child is not valid, return false
            return false;
          }
        }
      }
    
      // All checks passed, the propertyInfo and its children are valid
      return true;
  }
  
  getPropertiesRecursively(obj: any, propName: string,rootNumber:number = 1): PropertyInfo 
  {
      const propertyInfo: PropertyInfo = {
        propName,
        type: this.getPropertyType(obj),
        rootNumber:rootNumber
      };

    rootNumber += 1;
    if (Array.isArray(obj)) {
      propertyInfo.children = obj.map((item, index) =>
        this.getPropertiesRecursively(item, index.toString(),rootNumber)
      );
    } else if (typeof obj === 'object' && obj !== null) {
      propertyInfo.children = Object.keys(obj).map((key) =>
        this.getPropertiesRecursively(obj[key], key,rootNumber)
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


  constructor() { }
}
