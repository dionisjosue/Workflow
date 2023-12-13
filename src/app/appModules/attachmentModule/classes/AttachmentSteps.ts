import { BaseEntity } from "@share/classes/BaseEntity";
import { Attachment } from "./Attachment";
import { Step } from "@step/classes/Step";
import { Field } from "@field/classes/Field";

export class AttachmentSteps extends BaseEntity<number>{


    stepFk:number;
    attachmentFk:number;
    attachment?:Attachment;
    step?:Step;
    isRequired:boolean;
    isCheckList:boolean;
    field_fk:number;
    field:Field

    constructor(_step,attafk,rq,checkLt,fieldFk){
        super();
        this.stepFk = _step;
        this.attachmentFk = attafk;
        this.isCheckList = checkLt;
        this.isRequired = rq;
        this.field_fk = fieldFk
    }
}