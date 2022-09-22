import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class Page {
  get title(): HTMLElement {
    return <HTMLElement>this.debugElement.query(By.css('h3')).nativeElement;
  }

  get price(): HTMLElement {
    return <HTMLElement>(
      this.debugElement.query(By.css('.mat-card-content > div')).nativeElement
    );
  }

  get buttons(): DebugElement[] {
    return this.debugElement.queryAll(By.css('button'));
  }

  get searchButton(): HTMLButtonElement {
    return <HTMLButtonElement>this.buttons[0].nativeElement;
  }

  get addButton(): HTMLButtonElement {
    return <HTMLButtonElement>this.buttons[1].nativeElement;
  }

  constructor(private debugElement: DebugElement) {}
}
