import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlowComponent } from './flow/flow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OnClickAddCssDirective } from './on-click-add-css.directive';
import { StepComponent } from './step/step.component';
import { CreatEditFlowComponent } from './creat-edit-flow/creat-edit-flow.component';
import { AreaComponent } from './area/area.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateStepComponent } from './step/create-step/create-step.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { ConditionalComponent } from './conditional/createConditional.component';
import { FlowStepComponent } from './flow-step/flow-step.component';
import { ModuleComponent } from './module/module.component';
import { NgSelectGenericComponent } from './Commons/ng-select-generic/ng-select-generic.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { FieldComponent } from './field/field.component';
import { CreateFieldComponent } from './field/create-field/create-field.component';
import { FieldTypeComponent } from './field-type/field-type.component';
import { CreateFieldTypeComponent } from './field-type/create-field-type/create-field-type.component';
import { FormComponent } from './form/FormComponent/form.component';
import { CreateFormComponent } from './form/create-form/create-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataTablesModule } from 'angular-datatables';
import { HorizontalListComponent } from './Commons/horizontal-list/horizontal-list.component';
import { AttachmentComponent } from './attachment/readAttachment/attachment.component';
import { CreateAttachmentComponent } from './attachment/createAttachment/create-attachment/create-attachment.component';
import {MatIconModule} from '@angular/material/icon';
import { ListMenuComponent } from './Commons/list-menu/list-menu.component';
import { TemplateComponent } from './template/template.component';
import { CreateTemplateComponent } from './template/create-template/create-template.component';
import { TinymceComponent } from './Commons/tinymce/tinymce.component';
import { NgxEditorModule } from 'ngx-editor';
import { ModalVisualizerComponent } from './Commons/modal-visualizer/modal-visualizer.component';
import { ApiConfigComponent } from './api-config/read/api-config.component';
import { DetailApiConfigComponent } from './api-config/detail-api-config/detail-api-config.component';
import { ConditionalApiComponent } from './api-config/conditional-api/conditional-api.component';
import { ConditionalFieldComponent } from './conditional/conditional-field/conditional-field.component';
import { CreateApiConfigComponent } from './api-config/createApiConfig/create-api-config/create-api-config.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { JsonPropsComponent } from './api-config/createApiConfig/json-props/json-props.component';
import { ApiParamComponent } from './api-config/createApiConfig/api-param/api-param.component';
import { AuthenticationApiComponent } from './api-config/createApiConfig/authentication-api/authentication-api.component';
import { ApiBodyComponent } from './api-config/createApiConfig/api-body/api-body.component';
import { ApiHeaderComponent } from './api-config/createApiConfig/api-header/api-header.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowComponent,
    MenuComponent,
    OnClickAddCssDirective,
    StepComponent,
    CreatEditFlowComponent,
    AreaComponent,
    ProductComponent,
    CreateStepComponent,
    ConditionalComponent,
    FlowStepComponent,
    ModuleComponent,
    NgSelectGenericComponent,
    AlertDialogComponent,
    FieldComponent,
    CreateFieldComponent,
    FieldTypeComponent,
    CreateFieldTypeComponent,
    FormComponent,
    CreateFormComponent,
    HorizontalListComponent,
    AttachmentComponent,
    CreateAttachmentComponent,
    ListMenuComponent,
    TemplateComponent,
    CreateTemplateComponent,
    TinymceComponent,
    ModalVisualizerComponent,
    ApiConfigComponent,
    DetailApiConfigComponent,
    ConditionalApiComponent,
    ConditionalFieldComponent,
    CreateApiConfigComponent,
    JsonPropsComponent,
    ApiParamComponent,
    AuthenticationApiComponent,
    ApiBodyComponent,
    ApiHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    CommonModule,
    DragDropModule,
    DataTablesModule,
    MatIconModule,
    NgxEditorModule,
    NgJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
