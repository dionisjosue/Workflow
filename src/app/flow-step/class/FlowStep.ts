import { BaseEntity } from "../../Commons/classes/BaseEntity";
import { Step } from "../../step/Classes/Step";
import { Flow } from "../../flow/Classes/Flow";
import { Conditional } from "src/app/conditional/classes/Conditional";

export class FlowStep extends BaseEntity<number>{
    referenceName:string;
    comments:string;
    stepFk:number;
    flowFk:number;
    nextFlowStepFk:number;
    nextFlowStep:FlowStep | null;
    step:Step | null;
    flow:Flow | null;
    idx:number;
    NextFlowIdx:number;
    conditionals:Array<Conditional>
    

}