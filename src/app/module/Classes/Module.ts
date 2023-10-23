import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { Product } from "src/app/product/classes/Product";

export class Module extends BaseEntity<number>{

    name:string;
    description:string;
    Products: Array<Product>
}