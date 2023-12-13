import { NgModule } from "@angular/core";
import { ShareModule } from "@share/shareModule";
import { StepComponent } from "./components/step/step.component";
import { CreateStepComponent } from "./components/createStep/create-step.component";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { stepRoutingModule } from "./stepRoutingModule";


@NgModule({
    declarations:[
        StepComponent,
        CreateStepComponent,

    ],
    imports:[
        stepRoutingModule,
        ShareModule,
        NgbAlert

    ],
    providers:[],
    exports:[]

})
export class stepModule{

}