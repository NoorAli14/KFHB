// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// State
import {   User } from '../../../../../core/auth';

@Component({
  selector: 'kt-user-profile4',
  templateUrl: './user-profile4.component.html',
})
export class UserProfile4Component implements OnInit {
  // Public properties
  user$: Observable<User>;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor() {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
  }

  /**
   * Log out
   */
  logout() {
  }
}
