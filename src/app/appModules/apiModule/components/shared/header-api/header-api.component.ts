import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { apiConfiguration } from '@api/components/createApiConfig/create-api-config/apiConfiguration';

@Component({
  selector: 'app-header-api',
  templateUrl: './header-api.component.html',
  styleUrls: ['./header-api.component.css']
})
export class HeaderApiComponent implements AfterViewInit{

  form:FormGroup;
  @Input()dataValid:boolean;
  @Output()OnSave:EventEmitter<any>

  get getUrl():FormControl{
    return this.form.get('url') as FormControl;
  }
  get getName():FormControl{
    return this.form.get('name') as FormControl;
  }
  get gethttpMethod():FormControl{
    return this.form.get('httpMethod') as FormControl;
  }
  get getdescription():FormControl{
    return this.form.get('description') as FormControl;
  }

  constructor(private fb:FormBuilder){
    this.form = fb.group({
      name:['',[Validators.required,Validators.maxLength(100),Validators.minLength(5)]],
      url:['',[Validators.required,Validators.maxLength(200),Validators.minLength(5)]],
      description:[null,null],
      httpMethod:[0,Validators.required],
    })
  }
  ngAfterViewInit(): void {
    let self = this;
    this.form.valueChanges.subscribe(()=>{
      self.dataValid = !self.form.invalid
    });
  }

  initializeForm(data:apiConfiguration){
    this.getUrl.setValue(data.url);
    this.getName.setValue(data.name);
    this.getdescription.setValue(data.description);
    this.gethttpMethod.setValue(data.httpMethod);
  }


  onSaveData(){
    this.OnSave.emit();
  }
}
