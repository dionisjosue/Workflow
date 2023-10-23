import { Module } from "src/app/module/Classes/Module";
import { BaseEntity } from "../../Commons/classes/BaseEntity";

export class Product extends BaseEntity<number>{

    name:string;
    description:string;
    moduleFk:number;
    module:Module;
}