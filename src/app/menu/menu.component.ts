import { AfterViewInit, Component,OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  
  @ViewChild('sidebar', { static: true }) sidebar: ElementRef;
  @ViewChild('submenu', { static: true }) subMenu: ElementRef;

  hideMenu:boolean = false;
  ngAfterViewInit(): void {
  }

  deployElement(event){
    console.log(event);
  }
  toggle(){
    console.log("holaa");
    this.hideMenu = !this.hideMenu;
  }

 /* addSubmenu(event)
  {
    event.
    item.addEventListener('click', function() {
      this.querySelector('.sub-items').classList.toggle('open');
    });
  }*/
  
}
