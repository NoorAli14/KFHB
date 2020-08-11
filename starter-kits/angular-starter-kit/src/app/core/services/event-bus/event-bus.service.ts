import { Injectable } from '@angular/core';
import { EmitEvent } from '@shared/models/emit-event.model';
import { Subject } from 'rxjs';
import { Events } from '@shared/enums/events.enum';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();
  constructor() { }

  emit(event: EmitEvent) {
    this.subject$.next(event);
  }
  on(event: Events, callback: any) {
    return this.subject$.pipe(
      filter((e: EmitEvent) => e.name === event),
      map(item=>item.value)
    ).subscribe(callback)
  }
}
