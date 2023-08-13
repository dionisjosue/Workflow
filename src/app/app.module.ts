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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateStepComponent } from './step/create-step/create-step.component';

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
    CreateStepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
