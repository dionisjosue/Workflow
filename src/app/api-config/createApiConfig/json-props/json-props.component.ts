import { Component, Input } from '@angular/core';
import { jsonProps } from '../../classes/jsonProps';

@Component({
  selector: 'app-json-props',
  templateUrl: './json-props.component.html',
  styleUrls: ['./json-props.component.css']
})
export class JsonPropsComponent {
  @Input() items: jsonProps[];

}
