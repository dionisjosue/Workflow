import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-nav-tab',
  template:`<div class="row">
  <ul class="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
      <li class="nav-item flex-fill" role="presentation">
          <a [routerLinkActive]="['active']" [routerLink]="['params']" [class]="'nav-link w-100 '" id="step-tab" data-bs-toggle="tab" 
                  data-bs-target="#bordered-justified-steps" type="button" role="tab" aria-controls="home">
                  Parametros
          </a>
      </li>
      <li class="nav-item flex-fill">   
           <a [routerLinkActive]="['active']" routerLink="auth" [class]="'nav-link w-100 '" id="step-tab" data-bs-toggle="tab" 
              data-bs-target="#bordered-justified-steps" type="button" role="tab" aria-controls="home">
              Authenticacion
          </a>
      </li>
      <li class="nav-item flex-fill">
          <a [routerLinkActive]="['active']" routerLink="headers" [class]="'nav-link w-100 '" id="step-tab" data-bs-toggle="tab" 
          data-bs-target="#bordered-justified-steps" type="button" role="tab" aria-controls="home">
              Headers
      </a>
      </li>
      <li class="nav-item flex-fill">
          <a [routerLinkActive]="['active']" routerLink="body"   [class]="'nav-link w-100 '" id="step-tab" data-bs-toggle="tab" 
          data-bs-target="#bordered-justified-steps" type="button" role="tab" aria-controls="home">
              Body
          </a>
      </li>
  </ul>
  <br>
</div>`,
styleUrls:['./api-nav-tab.component.css']
})
export class ApiNavTabComponent {


}
