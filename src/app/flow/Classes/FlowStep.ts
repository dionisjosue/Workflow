import { BaseEntity } from "../../Commons/BaseEntity";
import { Step } from "../../step/Classes/Step";
import { Flow } from "./Flow";

export class FlowStep extends BaseEntity<number>{
    referenceName:string;
    comments:string;
    stepFk:number;
    flowFk:number;
    nextFlowStepFk:number;
    step:Step | null;
    flow:Flow | null;

}