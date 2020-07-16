import { Injectable,ErrorHandler  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService implements ErrorHandler {
  
  handleError(error: any): void {
   const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }

}
