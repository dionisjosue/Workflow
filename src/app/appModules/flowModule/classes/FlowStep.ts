import { BaseEntity } from "@share/classes/BaseEntity";
import { Step } from "@step/classes/Step";
import { Flow } from "./Flow";
import { Conditional } from "@conditional/classes/Conditional";

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