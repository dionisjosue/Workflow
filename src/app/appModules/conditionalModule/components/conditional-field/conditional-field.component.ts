import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ShareDataService } from '@share/services/share-data.service';
import { Field } from 'src/app/appModules/fieldModule/classes/Field';

@Component({
  selector: 'app-conditional-field',
  templateUrl: './conditional-field.component.html',
  styleUrls: ['./conditional-field.component.css'],
})
export class ConditionalFieldComponent implements OnInit{

  @Input()fields:Array<Field>;
  @Input()conditionals:FormArray;
  @Input()form:FormGroup<any>

  constructor(private shDt:ShareDataService){

  }
  ngOnInit(): void 
  {
    this.shDt.sharedData$.subscribe(data=> 
    {
      console.log(data);
      if(data instanceof FormArray)
        this.conditionals = data;
    })
  }

  getConditionFieldValue(prop:string,idx:number)
  {
    if(this.conditionals != undefined && this.conditionals != null)
        return this.conditionals.at(idx).get(prop)?.value ?? '';

    return '';
  }

  setValue(event,item:AbstractControl<any,any>){
    if(event.id == undefined){
      item.get('expectedValue').setValue(event.name);
    }
    else{
      item.get('expectedValue').setValue(null);
    }
  }
  deleteItem(idx:number){
    this.conditionals.removeAt(idx);
    if(idx > 0){
      let itm = this.conditionals.at(idx-1);
      itm.get('nextLogicalOperator').setValue('');
    }
    this.shDt.updateSharedData(this.conditionals);
  }


}
