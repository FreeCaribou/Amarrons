import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorCommunicationService {
  public readonly errorOccurs = new EventEmitter<any>();

  constructor() { }

  throwError(error) {
    this.errorOccurs.emit(error);
  }

  buildErrorMessage(error) {
    let messageToReturn = 'There is an error';

    if (error && error.message) {
      const message = error.message;
      if (!Array.isArray(message)) {
        messageToReturn = message;
      } else {
        // so it's an array
        let messageArray = '';
        message.forEach((e: string) => {
          messageArray += e + '\n';
        })
        messageToReturn = messageArray
      }
    }

    return messageToReturn;
  }

}