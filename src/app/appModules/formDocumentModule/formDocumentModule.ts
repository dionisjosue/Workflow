import { NgModule } from "@angular/core";
import { ShareModule } from "@share/shareModule";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CreateFormComponent } from "./components/create-form/create-form.component";
import { FormComponent } from "./components/FormComponent/form.component";
import { DataTablesModule } from "angular-datatables";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { formRoutingModule } from "./formRoutingModule";

@NgModule({
    declarations:[
        CreateFormComponent,
        FormComponent
    ],
    imports:[
        formRoutingModule,
        ShareModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        DragDropModule


    ],
    providers:[],

})
export class FormDocumentModule{

}