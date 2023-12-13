import { NgModule } from "@angular/core";
import { ShareModule } from "@share/shareModule";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CreateAttachmentComponent } from "./components/create-attachment/create-attachment.component";
import { AttachmentComponent } from "./components/readAttachment/attachment.component";
import { attachmentRoutingModule } from "./attachmentRoutingModule";

@NgModule({
    declarations:[
        AttachmentComponent,
        CreateAttachmentComponent,
    ],
    imports:[
        attachmentRoutingModule,
        ShareModule,
    ],
    providers:[],

})
export class attachmentModule{

}