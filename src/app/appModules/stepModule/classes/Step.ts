import { BaseEntity } from "@share/classes/BaseEntity";
import { Area } from "src/app/area/Area";

export class Step extends BaseEntity<number>{

    public name:string;
    public areaFk:number;
    public sla:Number;
    public area:Area;
    public editMode:boolean = true;
}