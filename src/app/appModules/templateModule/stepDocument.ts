import { Step } from "@step/classes/Step";
import { BaseEntity } from "@share/classes/BaseEntity";
import { document } from "./classes/document";

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