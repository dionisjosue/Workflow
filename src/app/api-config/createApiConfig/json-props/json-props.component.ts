import { Component, Input, OnInit } from '@angular/core';
import { jsonProps } from '../../classes/jsonProps';
import { PropertyInfo } from '../PropertyInfo';
import { Field } from 'src/app/field/classes/Field';
import { FieldService } from 'src/app/field/services/field.service';

@Component({
  selector: 'app-json-props',
  templateUrl: './json-props.component.html',
  styleUrls: ['./json-props.component.css']
})
export class JsonPropsComponent implements OnInit{
 
  @Input() propertyInfo: PropertyInfo;
  @Input() fields:Field[];

  constructor(private fieldSv:FieldService){

  }


  ngOnInit(): void {
  }
  validateCanDisplay(prop){
    return isNaN(Number(prop.propName)) && prop.propName != 'Root';
  }

}
