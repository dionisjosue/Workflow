import { BaseEntity } from "src/app/Commons/classes/BaseEntity";
import { AttachmentSteps } from "./AttachmentSteps";

export class Attachment extends BaseEntity<number>{
    
    name:string;
    description:string;
    tooltip:string;
    acceptExtensions:string;
    attachmentSteps:Array<AttachmentSteps>;

    constructor(_name:string,_desc:string,_tool:string,_accept:any[],
        _steps:AttachmentSteps[])
        {
            super();
            this.name = _name;
            this.description = _desc;
            this.tooltip = _tool;
            this.acceptExtensions = _accept.join(',');
            this.attachmentSteps = _steps.map(t=>{
                return new AttachmentSteps(t.stepFk,0,t.isRequired,t.isCheckList,t.field_fk);
            })

        }
}