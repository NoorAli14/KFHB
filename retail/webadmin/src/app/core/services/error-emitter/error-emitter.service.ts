import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MESSAGES } from '@shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorEmitterService {

  private messageSource = new BehaviorSubject({type: 'error',message: ''});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  emit(message: string, type:string) {
    this.messageSource.next({message,type})
  }
}
