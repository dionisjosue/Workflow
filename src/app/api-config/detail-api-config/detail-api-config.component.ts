import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/Commons/share-data.service';

@Component({
  selector: 'app-detail-api-config',
  templateUrl: './detail-api-config.component.html',
  styleUrls: ['./detail-api-config.component.css']
})
export class DetailApiConfigComponent implements OnInit{

  constructor(private shDt:ShareDataService){

  }
  ngOnInit(): void {
    this.shDt.sharedData$.subscribe(t=>{
      console.log(t);
    });
  }
}
