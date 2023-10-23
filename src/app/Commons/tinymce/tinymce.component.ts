import { AfterViewInit, Component } from '@angular/core';
declare var tinymce: any;
@Component({
  selector: 'app-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.css']
})
export class TinymceComponent implements AfterViewInit
{

  constructor(){

  }

  ngAfterViewInit(): void {
    
    tinymce.init({
      selector: '#mytextarea',
      plugins: 'advlist autolink lists link image charmap print preview anchor',
      toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      menubar: false
    });
  }
}

