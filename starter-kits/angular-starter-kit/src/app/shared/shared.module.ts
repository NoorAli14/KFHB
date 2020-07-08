import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatErrorComponent } from './components/mat-error/mat-error.component';

@NgModule({
  declarations: [MatErrorComponent],
  imports: [ CommonModule],
  exports: [MatErrorComponent]
})
export class SharedModule {}
