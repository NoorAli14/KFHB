import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyComponent } from './dummy/dummy.component';



@NgModule({
  declarations: [DummyComponent],
  imports: [
    CommonModule
  ],
  exports:[DummyComponent]
})
export class ComponentModule { }
