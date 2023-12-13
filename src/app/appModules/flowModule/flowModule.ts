import { NgModule } from "@angular/core";
import { FlowStepComponent } from "./components/flow-step/flow-step.component";
import { FlowComponent } from "./components/flow/flow.component";
import { ShareModule } from "@share/shareModule";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CreatEditFlowComponent } from "./components/creat-edit-flow/creat-edit-flow.component";
import { flowRoutingModule } from "./flowRoutingModule";
import { ConditionalComponent } from "@conditional/components/createConditional/createConditional.component";
import { conditionalModule } from "@conditional/conditionalModule";


@NgModule({
    declarations:[
        FlowStepComponent,
        FlowComponent,
        CreatEditFlowComponent
    ],
    imports:[
        flowRoutingModule,
        ShareModule,
        CommonModule,
        ReactiveFormsModule,
        conditionalModule

    ],
    providers:[],

})
export class flowModule{

}