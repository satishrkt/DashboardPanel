import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonDirective]',
  standalone: true
})
export class ButtonDirectiveDirective implements OnInit {

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
      
  }

  @HostListener('mouseenter') mouseEnter() {
    console.log("button Directive");
    this.renderer.setStyle(this.eleRef.nativeElement, 'backgroundColor', 'green');
  }

  @HostListener('mouseleave') mouseLeave() {
    this.renderer.setStyle(this.eleRef.nativeElement, 'backgroundColor', 'blue');
  }

}
