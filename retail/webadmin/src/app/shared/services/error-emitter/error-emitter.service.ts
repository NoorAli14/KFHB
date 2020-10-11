import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorEmitterService {

  private messageSource = new BehaviorSubject({type: 'error', message: ''});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  emit(message: string, type: string): void {
    this.messageSource.next({message, type});
  }
}
