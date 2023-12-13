import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { jsonProps } from './jsonProps';
import { PropertyInfo } from './PropertyInfo';
import { Field } from 'src/app/appModules/fieldModule/classes/Field';
import { FieldService } from 'src/app/appModules/fieldModule/services/field.service';
import { PropertyInfoService } from '@api/services/property-info.service';
import { ShareDataComplexService } from '@share/services/share-data-complex.service';

@Component({
  selector: 'app-json-props',
  templateUrl: './json-props.component.html',
  styleUrls: ['./json-props.component.css']
})
export class JsonPropsComponent implements OnInit{
 
  @Input() propertyInfo: PropertyInfo;
  @Input() fields:Field[];

 // @Output()onchange:EventEmitter<any>;

  constructor(private propSv:PropertyInfoService,private shareDtSv:ShareDataComplexService)
  {
  }

  refreshData(event,propInfo:PropertyInfo)
  {
    let rootProp = this.propSv.getRootPropertyInfo();
     this.propSv.propUpdate = false;
     let newValue = 'fld_'+propInfo.fieldMapped;
     this.propSv.updateValue(rootProp.jsonText,propInfo.propName,propInfo.value,newValue,propInfo.rootNumber,1)
     if(this.propSv.propUpdate)
     {
        propInfo.value = 'fld_'+propInfo.fieldMapped;
     }
     console.log(rootProp.jsonText);
     //rootPropInfo.jsonText = rootPropInfo.jsonText.replace()
  }
  sendData(){
    this.shareDtSv.updateData('propertyInfo',this.propSv.getRootPropertyInfo());
  }

  ngOnInit(): void {
  }
  validateCanDisplay(prop){
    return isNaN(Number(prop.propName)) && prop.propName != 'Root';
  }
  setValue(event,property:PropertyInfo)
  {
    if(!event.id){
      property.valueMapped = event.name;
      property.fieldMapped = null;
    }
    else{
      property.valueMapped = null;
      property.fieldMapped = event.id;

    }
  }
  

}
