import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { lisItem } from './listItem';
import { ShareDataService } from 'src/app/Commons/share-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnDestroy{

  titleItems:Array<lisItem> = new Array<lisItem>();

  currentList:Array<lisItem> = new Array<lisItem>();
  
  @Output()onSelect:EventEmitter<lisItem> = new EventEmitter<lisItem>();

  itemPerList:number=5;
  nextAvail:boolean = false;
  lastIdx:number;
  firstIdx:number = 0;
  sub:Subscription;

  constructor(private shareData:ShareDataService){
    console.log('text');
    this.sub = this.shareData.sharedData$.subscribe((rt:Array<lisItem>) =>{
        let itms = rt
     
        if(itms != undefined && itms instanceof Array && itms[0] instanceof lisItem)
        {
          let itmsPrev = this.titleItems;
          this.titleItems = rt;
  
            this.lastIdx = itms.length < 5 ? itms.length : this.itemPerList;
            this.currentList = itms.slice(0,this.lastIdx);
            this.nextAvail = !(itms.length == this.lastIdx);
        }
    });
  }
  ngOnDestroy(): void {
    console.log('destruyendo list items');
    this.sub.unsubscribe();
  }
 
  onSelectItem(event:lisItem)
  {
    if(!event.selected){
      this.titleItems.map(t=> t.selected = false);
      event.selected = true;
      this.onSelect.emit(event);
    }

  }
  nextItem()
  {
    if(this.nextAvail){
      this.lastIdx ++;
      this.firstIdx ++;
      this.currentList = this.titleItems.slice(this.firstIdx,this.lastIdx);
      this.nextAvail =  !(this.titleItems.length == this.lastIdx);
    }
  }
  prevItem()
  {
    if(this.titleItems != undefined && this.titleItems.length > 0 && this.firstIdx > 0){
      this.lastIdx --;
      this.firstIdx --;
      this.currentList = this.titleItems.slice(this.firstIdx,this.lastIdx);
      this.nextAvail =  !(this.titleItems.length == this.lastIdx);

    }
    
  }
  deleteItem(idx){
    this.titleItems = this.titleItems.splice(idx,1);
    if(this.lastIdx > this.titleItems.length -1){
      this.firstIdx --;
      this.lastIdx--;
    }
    this.currentList = this.titleItems.slice(this.firstIdx,this.lastIdx);
    this.nextAvail =  !(this.titleItems.length == this.lastIdx);

  }
  lastFive()
  {
    if(this.titleItems.length > 5)
    {
      this.lastIdx = this.titleItems.length;
      this.firstIdx = this.lastIdx - 5;
      this.currentList = this.titleItems.slice(this.firstIdx,this.lastIdx);
    }
   
  }

}
