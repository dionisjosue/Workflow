import { BaseEntity } from "../../Commons/BaseEntity";
import { Product } from "../../product/Product";
import { FlowStep } from "./FlowStep";

export class Flow extends BaseEntity<number>{

    flowName:string;
    description:string;
    productFk:number;
    product:Product;
    flowSteps:Array<FlowStep>
    showSteps:string = "hideTable";
}