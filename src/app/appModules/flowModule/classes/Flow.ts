import { BaseEntity } from "@share/classes/BaseEntity";
import { FlowStep } from "./FlowStep";
import { Product } from "src/app/product/classes/Product";

export class Flow extends BaseEntity<number>{

    flowName:string;
    description:string;
    productFk:number;
    product?:Product;
    flowSteps?:Array<FlowStep>
    showSteps:string = "hideTable";
}