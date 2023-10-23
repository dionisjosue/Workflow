import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { Form } from "./Form";
import { Step } from "src/app/step/Classes/Step";

export class FormStep extends BaseEntity<number>{
    
    constructor(stepFk){
        super();
        this.stepFk = stepFk;
        this.formFk = 0;
    }

    stepFk:number;
    formFk:number;
    form?:Form;
    step?:Step;
}