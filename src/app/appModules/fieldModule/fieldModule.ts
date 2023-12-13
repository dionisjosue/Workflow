import { NgModule } from "@angular/core";
import { CreateFieldComponent } from "./components/create-field/create-field.component";
import { FieldComponent } from "./components/field/field.component";
import { CreateFieldTypeComponent } from "./components/create-field-type/create-field-type.component";
import { ShareModule } from "@share/shareModule";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { fieldRoutingModule } from "./fieldRoutingModule";

@NgModule({
    declarations:[
        FieldComponent,
        CreateFieldTypeComponent,
        CreateFieldComponent,
    ],
    imports:[
        fieldRoutingModule,
        CommonModule,
        ShareModule,
        ReactiveFormsModule,
        FormsModule,

    ],
    providers:[],

})
export class FieldModule{

}