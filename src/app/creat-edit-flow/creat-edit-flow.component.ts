import { Component, OnInit,AfterViewInit, OnDestroy, Input,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FlowStep } from '../flow-step/class/FlowStep';
import { Flow } from '../flow/Classes/Flow';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FlowFilter } from '../flow/Classes/FlowFilter';
import { FlowService } from '../flow/Services/flow.service';
import { Product } from '../product/classes/Product';
import { ProductService } from '../product/services/product.service';
import { ModuleService } from '../module/services/module.service';
import { Module } from '../module/Classes/Module';
import { ShareDataService } from '../Commons/share-data.service';
import { callbackResult } from '../Commons/ng-select-generic/callbackResult';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectGenericComponent } from '../Commons/ng-select-generic/ng-select-generic.component';
import { modalInput } from '../alert-dialog/modalInput';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Alert } from '../Commons/classes/Alert';



@Component({
  selector: 'app-creat-edit-flow',
  templateUrl: './creat-edit-flow.component.html',
  styleUrls: ['./creat-edit-flow.component.css']
})
export class CreatEditFlowComponent implements OnInit,AfterViewInit,OnDestroy{

  form:FormGroup;

  Flow:Flow;
  flowSteps: Array<FlowStep>;
  flowFk:number;
  dialogInput:modalInput;
  @ViewChild('categorySelect')categorySelectC:NgSelectGenericComponent;
  @ViewChild('dialog')dialog:AlertDialogComponent;
  private rowDataSubscription: Subscription;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,private route: ActivatedRoute,
    private flowRp:FlowService,public svProd:ProductService,
    private shareService:ShareDataService,
    public mdService:ModuleService,
    private nav:Router)
    {
      this.dialogInput = new modalInput('','','');
      this.form = this.fb.group({
        flowName:['',Validators.required],
        productFk:[0,Validators.required],
        description:['',null],
        moduleFk:[0,Validators.required]
      })
     
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit(): void 
  {
    var self = this;
    this.rowDataSubscription = this.shareService.sharedData$.subscribe((updatedData) => {
      console.log('Updated Row Data in Parent:', updatedData);
      if(self.Flow != null && self.Flow != undefined){
        self.flowSteps = updatedData as Array<FlowStep>;
        console.log(self.Flow);
      }
      // Handle the updated data as needed
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.flowFk = Number.parseInt(params.get('id'));
        console.log('Route Param ID:', this.flowFk);
        this.getFlow(this.flowFk);
      });
  }
 
  getFlow(id:number){
    if(id > 0)
    {
      var ft = new FlowFilter();
      ft.id = id;
      this.flowRp.getData(ft).subscribe(
        {
          next:(data)=>
          {
            if(data.success)
            {
              if(data.items.length > 0){
                this.Flow = data.items[0];
                this.initializeFlow();
              }
              else
              {
                //REDIRECT TO MAIN PAGE OF FLOW WITH A MESSAGE (MAYBE A FRAGMENT)
                  //WIT THAT FLOW DO NOT EXISTS
              }
            }
            else{
              //a detailed message that a error has ocurred
            }
          },
          error:(err)=>{
            console.log(err);
            //MESSAGE ALERT
          }
        }
      )
    }
    else{
      this.getFlowModel();
    }
  }

  callbackCategory(data:Product,alert:Alert):callbackResult
  {
      var result = new callbackResult(true);
      var module = this.form.get("moduleFk").value;
      if(data.moduleFk <= 0 || data.moduleFk == undefined){
        if(module > 0)
        {
          data.moduleFk = module;
        }
        else{
          alert.message = "Seleccionar un modulo es requerido para crear una categoria";
          alert.show =true;
          alert.shwBtn = false;
          result.success = false
        }
      }
      result.alert = alert;
      result.data = data;
      return result;
  }
  get value(){
    return this.form.controls['flowName'].value ?? "NOMBRE DEL FLUJO";
  }
  getFlowModel()
  {
    this.Flow= this.Flow ?? new Flow();
    this.Flow = this.form.value;
  }
  saveFlow(){
    this.Flow = this.form.value as Flow;
    this.Flow.flowSteps = this.flowSteps;
    let data = new Array<Flow>();
    data.push(this.Flow);

    this.flowRp.saveData(data).subscribe({
      next:(data)=>{
        if(data.success)
        {
           this.dialogInput.modalId = "alertId";
           this.dialogInput.message = "El flujo " +  this.Flow.flowName  +" se ha guardado exitosamente";
           this.dialogInput.title = "DATOS GUARDADOS!"
           this.dialog.open();
        }
      },
      error:(err)=>{
      }
    });
  }
  onCloseAlert(event){
    this.nav.navigate(['../Flujo']);
  }
  private initializeFlow()
  {
    const data = {
      flowName: this.Flow.flowName,
      productFk: this.Flow.productFk,
      description: this.Flow.description
    };
    this.form.patchValue(data)
  }
  getControl(controlName){
    return this.form.get(controlName);
  }
  filterCategory(){
    this.categorySelectC.items = this.categorySelectC.copyList
    .filter(t=> t.moduleFk == this.getControl("moduleFk").value)

    var ct = this.getControl("productFk");
    var exists = this.categorySelectC.items.find
    (t=> t.id == ct.value);
    if(!exists){
      ct.setValue(-1);
    }
    
  }
  closeModule(event){

  }
  saveProduct(event){

  }
  closeProduct(event){

  }

}
