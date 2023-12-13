import { NgModule } from "@angular/core";
import { AlertDialogComponent } from "./components/alert-dialog/alert-dialog.component";
import { ModalVisualizerComponent } from "./components/modal-visualizer/modal-visualizer.component";
import { NgSelectGenericComponent } from "./components/ng-select-generic/ng-select-generic.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HorizontalListComponent } from "./components/horizontal-list/horizontal-list.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ListMenuComponent } from "./components/list-menu/list-menu.component";
import { ConditionalComponent } from "@conditional/components/createConditional/createConditional.component";
import { ConditionalFieldComponent } from "@conditional/components/conditional-field/conditional-field.component";
import { CommonModule } from "@angular/common";
import { TitlePageComponent } from "./components/title-page/title-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ErrorMessageComponent } from "./components/app-error-message";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";

@NgModule({
    declarations:[
        AlertDialogComponent,
        ListMenuComponent,
        ModalVisualizerComponent,
        NgSelectGenericComponent,
        HorizontalListComponent,
        TitlePageComponent,
        ErrorMessageComponent,
        FileUploadComponent
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        NgSelectModule,
        DragDropModule

    ],
    providers:[],
    exports:[
        CommonModule,
        ReactiveFormsModule,
        DragDropModule,
        NgSelectModule,
        NgSelectGenericComponent,
        HorizontalListComponent,
        AlertDialogComponent,
        ListMenuComponent,
        ModalVisualizerComponent,
        TitlePageComponent,
        ErrorMessageComponent,
        FileUploadComponent,
        NgbModule

       // ConditionalComponent,
       // ConditionalFieldComponent
    ]

})
export class ShareModule{

}