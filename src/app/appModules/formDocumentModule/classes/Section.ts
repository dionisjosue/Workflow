import { BaseEntity } from "@share/classes/BaseEntity";

export class Section extends BaseEntity<number>
{
    title:string;
    name:string;
    sectionFk:number;
    sectionChild:Section;
}