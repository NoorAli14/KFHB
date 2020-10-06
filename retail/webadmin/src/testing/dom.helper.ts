import { ComponentFixture } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>;
  config: any;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
    this.config = {
      layout: {
          navbar: {
              hidden: true,
          },
          toolbar: {
              hidden: true,
          },
          footer: {
              hidden: true,
          },
          sidepanel: {
              hidden: true,
          },
      },
  };
  }

  clickElement(tagName): void{
    const button: HTMLButtonElement = this.fixture.debugElement.query(
        By.css(tagName)
    ).nativeElement;
    button.click();
  }
  findOne(tagName): any{
    return this.fixture.debugElement.query(
        By.css(tagName)
    ).nativeElement;
  }
  setForm(form: FormGroup, value): void{
      form.patchValue(value);
      this.fixture.detectChanges();
  }
 
}
