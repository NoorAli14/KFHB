import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(
      private _formBuilder: FormBuilder,
      public matDialogRef: MatDialogRef<UserFormComponent>,
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Reactive Form
      this.form = this._formBuilder.group({
          firstName : ['', Validators.required],
          lastName  : ['', Validators.required],
          city      : ['', Validators.required],
          state     : ['', Validators.required],
          postalCode: ['', [Validators.required, Validators.maxLength(5)]],
          country   : ['', Validators.required]
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }
}
