import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiConfigComponent } from './components/read/api-config.component';
import { CreateApiConfigComponent } from './components/createApiConfig/create-api-config/create-api-config.component';
import { ApiParamComponent } from './components/createApiConfig/api-param/api-param.component';
import { AuthenticationApiComponent } from './components/createApiConfig/authentication-api/authentication-api.component';
import { ApiHeaderComponent } from './components/createApiConfig/api-header/api-header.component';
import { ApiBodyComponent } from './components/createApiConfig/api-body/api-body.component';
import { DetailApiConfigComponent } from './components/detail-api-config/detail-api-config.component';

const routes: Routes = 
[
  {
    path: '',
    component: ApiConfigComponent,
    children:[
      {
        path:'api/params',component:ApiParamComponent
      }
    ]
  },
  {
     path: 'create', component: CreateApiConfigComponent,
     children:[
      {path:'params',component: ApiParamComponent},
      {path:'auth',component: AuthenticationApiComponent},
      {path:'headers',component: ApiHeaderComponent},
      {path:'body',component: ApiBodyComponent},
     ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class apiRoutingModule { }
