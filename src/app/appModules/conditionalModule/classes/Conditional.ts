import { BaseEntity } from "@share/classes/BaseEntity";
import { ConditionalFields } from "./ConditionalFields";
import { lisItem } from "@share/components/list-menu/listItem";
import { FlowStep } from "@flow/classes/FlowStep";

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