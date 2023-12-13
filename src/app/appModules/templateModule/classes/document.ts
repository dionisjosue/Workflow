import { BaseEntity } from "@share/classes/BaseEntity";
import { documentFields } from "@template/documentFields";
import { StepDocument } from "@template/stepDocument";

export class document extends BaseEntity<number>{

    template:string;
    name:string;
    fields:Array<documentFields>
    steps:Array<StepDocument>
    stepsId:Array<number>
    showSteps:boolean=true;
    stepToShow:Array<StepDocument>
    showVisor:boolean=false;
    orderId:number;
    imageUrl:string;
    templateChanged:boolean = true;
    editMode:boolean = false;

  


    constructor(_temp,_nam,_fields:Array<documentFields>,_steps:Array<number>,_order){
        super();
        this.template = _temp;
        this.name = _nam;
        this.orderId = _order;
        this.fields = new Array<documentFields>();
        this.steps = new Array<StepDocument>();
        if(_fields != undefined && _fields != null)
        {
            this.fields = _fields.map((t,i)=>{
                return new documentFields(t.fieldFk,0,t.comodin);
            }) 
        }
        if(_steps != undefined && _steps != null)
        {
            this.steps =  _steps.map((t,i)=>{
                return new StepDocument(t,0);
            });
        }
     
    }
}