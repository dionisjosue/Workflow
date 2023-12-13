import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.css']
})
export class HorizontalListComponent {
 
  @Input() items:Array<any>
  @Output()onDelete:EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output()onMaximize:EventEmitter<Array<any>> = new EventEmitter<Array<any>>();


  deleteItem(item: any): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  maximize(item){

    this.onMaximize.emit(item);
  }
  onDrop(event: CdkDragDrop<any>) {
    console.log(event);
    const previousIndex = event.previousIndex;
    const newIndex = event.currentIndex;

    if(newIndex == previousIndex)
      return;

    // Rearrange the items in the FormArray
    const movedItem = this.items[previousIndex];
    this.items.slice(previousIndex,1);
    this.items.splice(newIndex,0, movedItem);
  }
}
