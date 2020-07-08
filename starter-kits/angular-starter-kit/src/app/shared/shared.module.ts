import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatErrorComponent } from './components/mat-error/mat-error.component';

@NgModule({
  declarations: [MatErrorComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [MatErrorComponent]
})
export class SharedModule {}
