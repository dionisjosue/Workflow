import { NgModule } from "@angular/core";
import { ShareModule } from "@share/shareModule";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { ConditionalComponent } from "./components/createConditional/createConditional.component";
import { ConditionalFieldComponent } from "./components/conditional-field/conditional-field.component";


@NgModule({
    declarations:[
        ConditionalComponent,
        ConditionalFieldComponent
    ],
    imports:[
        ShareModule,
        NgbAlert

    ],
    providers:[],
    exports:[
        ConditionalComponent,
        ConditionalFieldComponent
    ]

})
export class conditionalModule{

}