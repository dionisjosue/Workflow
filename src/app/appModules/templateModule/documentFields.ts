import { Field } from "@field/classes/Field";
import { BaseEntity } from "@share/classes/BaseEntity";

export class documentFields extends BaseEntity<number>{

    documentFk:number;
    fieldFk:number;
    document:Document;
    field:Field;
    comodin:string;
    fieldFkPrev:number;

    constructor(field_fk,_docFk,_com){
        super();
        this.fieldFk = field_fk;
        this.documentFk = _docFk;
        this.comodin = _com;
    }
}