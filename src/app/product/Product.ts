import { BaseEntity } from "../Commons/BaseEntity";

export class Product extends BaseEntity<number>{

    name:string;
    description:string;
}