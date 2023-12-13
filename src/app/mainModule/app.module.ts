import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { OnClickAddCssDirective } from '../on-click-add-css.directive';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { stepModule } from '@step/stepModule';
import { flowModule } from '@flow/flowModule';
import { apiModule } from '@api/apiModule';
import { FormDocumentModule } from '@form/formDocumentModule';
import { FieldModule } from '@field/fieldModule';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OnClickAddCssDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    stepModule,
    flowModule,
    apiModule,
    FormDocumentModule,
    FieldModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
