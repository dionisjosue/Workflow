import { BaseEntity } from "../../Commons/classes/BaseEntity";
import { Product } from "../../product/classes/Product";
import { FlowStep } from "../../flow-step/class/FlowStep";

export class Flow extends BaseEntity<number>{

    flowName:string;
    description:string;
    productFk:number;
    product?:Product;
    flowSteps?:Array<FlowStep>
    showSteps:string = "hideTable";
}