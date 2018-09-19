import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../alert/alert.component';

@Injectable()
export class AlertService {
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService
  ) { }

  alert(title: string, message: string): Observable<string> {
    const initialState = {
      title: title,
      message: message
    };
    this.bsModalRef = this.bsModalService.show(AlertComponent, { initialState });

    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.answer);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }
}