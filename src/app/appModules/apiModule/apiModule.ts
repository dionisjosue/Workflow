import { NgModule } from "@angular/core";
import { ShareModule } from "@share/shareModule";
import { FormsModule } from "@angular/forms";
import { ConditionalApiComponent } from "./components/conditional-api/conditional-api.component";
import { ApiBodyComponent } from "./components/createApiConfig/api-body/api-body.component";
import { ApiHeaderComponent } from "./components/createApiConfig/api-header/api-header.component";
import { ApiParamComponent } from "./components/createApiConfig/api-param/api-param.component";
import { AuthenticationApiComponent } from "./components/createApiConfig/authentication-api/authentication-api.component";
import { CreateApiConfigComponent } from "./components/createApiConfig/create-api-config/create-api-config.component";
import { JsonPropsComponent } from "./components/createApiConfig/json-props/json-props.component";
import { NgJsonEditorModule } from "ang-jsoneditor";
import { DetailApiConfigComponent } from "./components/detail-api-config/detail-api-config.component";
import { ApiConfigComponent } from "./components/read/api-config.component";
import { apiRoutingModule } from "./apiRoutingModule";
import { conditionalModule } from "@conditional/conditionalModule";
import { JsonVisorComponent } from "./components/read/json-visor/json-visor.component";
import { ApiNavTabComponent } from "./components/shared/api-nav-tab/api-nav-tab.component";
import { HeaderApiComponent } from "./components/shared/header-api/header-api.component";


@NgModule({
    declarations:[
        ApiConfigComponent,
        ConditionalApiComponent,
        ApiBodyComponent,
        ApiHeaderComponent,
        ApiParamComponent,
        AuthenticationApiComponent,
        CreateApiConfigComponent,
        JsonPropsComponent,
        DetailApiConfigComponent,
        ConditionalApiComponent,
        JsonVisorComponent,
        ApiNavTabComponent,
        HeaderApiComponent
    ],
    imports:[
        apiRoutingModule,
        FormsModule,
        NgJsonEditorModule,
        ShareModule,
        conditionalModule,

    ],
    providers:[],

})
export class apiModule{

}