import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css'],
  standalone:false
})
export class TitlePageComponent {

  @Input()title:string;
  @Input()route:string;
  @Input()titltBtn:string = 'CREAR NUEVO';

}
