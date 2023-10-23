import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { FlowStep } from "src/app/flow-step/class/FlowStep";
import { Step } from "src/app/step/Classes/Step";
import { document } from "./document";

export class StepDocument extends BaseEntity<number>{

    stepFk:number;
    documentFk:number;
    step:Step;
    document:document;
    removed:boolean;

    constructor(_stepFk,_docFk,step = null,docum = null){
        super();
        this.stepFk = _stepFk;
        this.documentFk = _docFk;
        this.step = step;
    }

}