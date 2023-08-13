import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOnClickAddCss]'
})
export class OnClickAddCssDirective {

  @Input('appClickClass') className: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event:MouseEvent)
  {
      var tar = event.target as HTMLElement;
      console.log(tar);
      const targetElement = this.el.nativeElement.querySelector('.nav-link');
      const targetElementchild = this.el.nativeElement.querySelector('.nav-content');
      console.log(targetElement);
      if (targetElement && tar.classList.contains('parent')) 
      {
        if(targetElement.classList.contains('collapsed')){
          this.renderer.removeClass(targetElement, 'collapsed');
          this.renderer.removeClass(targetElementchild,'hide')
          //targetElement.classList.toggle('');
          //targetElement.classList.removeClass('open');
          
        }
        else{
          console.log(this.className);
          this.renderer.addClass(targetElement,'collapsed');
          this.renderer.addClass(targetElementchild,'hide')

        }
      }
    }
}
