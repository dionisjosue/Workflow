import { BaseEntity } from "@share/classes/BaseEntity";
import { Module } from "src/app/module/Module";

export class Product extends BaseEntity<number>{

    name:string;
    description:string;
    moduleFk:number;
    module:Module;
}