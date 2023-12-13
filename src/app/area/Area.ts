import { BaseEntity } from "@share/classes/BaseEntity";

export class Area extends BaseEntity<number>{

    public name:string;
    public description:string;
    idx:number;
}