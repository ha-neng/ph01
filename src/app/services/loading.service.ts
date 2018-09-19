import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoadingComponent } from '../loading/loading.component';

@Injectable()
export class LoadingService {

    bsModalRef: BsModalRef;

    constructor(
        private bsModalService: BsModalService
    ) { }

    onClose: any;

    hide() {
        setTimeout(() => {
            this.bsModalRef.hide();
            console.log('auto hide');
        }, 1000);
    }

    config = {
        backdrop: true,
        ignoreBackdropClick: true
    };

    show(message: string) {
        const initialState = {
            message: message
        };
        // this.bsModalRef = this.bsModalService.show(LoadingComponent,initialState);
        this.bsModalRef = this.bsModalService.show(LoadingComponent, this.config);
    }

}