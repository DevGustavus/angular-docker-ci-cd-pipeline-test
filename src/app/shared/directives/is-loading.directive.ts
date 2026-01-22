import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[isLoading]',
})
export class IsLoadingDirective {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  @Input()
  public set isLoading(value: boolean) {
    if (!value) {
      const firstChild = this.elementRef.nativeElement.children[0];
      if (!firstChild || firstChild.tagName !== 'BTN-LOADING-CONTENT') return;

      const childrens = firstChild.childNodes;

      while (this.elementRef.nativeElement.firstChild) {
        this.elementRef.nativeElement.removeChild(
          this.elementRef.nativeElement.firstChild
        );
      }

      this.elementRef.nativeElement.append(...(childrens as unknown as Node[]));
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'disabled',
        false
      );
      return;
    }

    const customElement: HTMLElement = this.renderer.createElement(
      'btn-loading-content'
    );
    customElement.append(
      ...(this.elementRef.nativeElement.childNodes as unknown as Node[])
    );
    customElement.style.display = 'none';

    while (this.elementRef.nativeElement.firstChild) {
      this.elementRef.nativeElement.removeChild(
        this.elementRef.nativeElement.firstChild
      );
    }

    this.renderer.appendChild(this.elementRef.nativeElement, customElement);

    const loaderEl = this.renderer.createElement('div');
    loaderEl.classList.add('btn-loading');

    const span = this.renderer.createElement('span');
    span.classList.add('spinner-border');
    span.style.width = '1.5rem';
    span.style.height = '1.5rem';

    const spanChild: HTMLSpanElement = this.renderer.createElement('span');
    spanChild.classList.add('visually-hidden');
    spanChild.appendChild(this.renderer.createText('Carregando'));

    this.renderer.appendChild(span, spanChild);
    this.renderer.appendChild(loaderEl, span);
    this.renderer.appendChild(this.elementRef.nativeElement, loaderEl);
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', true);
  }
}
