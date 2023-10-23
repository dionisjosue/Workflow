import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { FlowStep } from "src/app/flow-step/class/FlowStep";
import { lisItem } from "../../Commons/list-menu/listItem";
import { ConditionalFields } from "./ConditionalFields";

export class Conditional extends BaseEntity<number>{

    referenceName:string;
    commentResult:string;
    flowStepFk:number;
    alternateFlowStepFk:number;
    flowStep:FlowStep;
    alternateFlowStep:FlowStep;
    orderId:number
    conditionalFields:Array<ConditionalFields>;
    

    public static getListItem(items:Array<Conditional>):Array<lisItem>
    {
        return items.map((t,index)=> new lisItem(t.referenceName,index,false));
    }

}