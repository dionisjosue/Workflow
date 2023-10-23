import { BaseEntity } from "../../Commons/classes/BaseEntity";
import { Area } from "../../area/Area";

export class Step extends BaseEntity<number>{

    public name:string;
    public areaFk:number;
    public sla:Number;
    public area:Area;
}