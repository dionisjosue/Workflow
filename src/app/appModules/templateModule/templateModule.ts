import { NgModule } from "@angular/core";
import { ShareModule } from "@share/shareModule";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { TemplateComponent } from "./components/template/template.component";
import { CreateTemplateComponent } from "./components/create-template/create-template.component";
import { templateRoutingModule } from "./templateRoutingModule";


@NgModule({
    declarations:[
        TemplateComponent,
        CreateTemplateComponent
    ],
    imports:[
        templateRoutingModule,
        FormsModule,
        ShareModule,
        CommonModule,
        ReactiveFormsModule,
        NgbAlert

    ],
    providers:[],

})
export class templateModule{

}