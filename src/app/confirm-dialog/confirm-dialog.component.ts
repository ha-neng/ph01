import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  message: string;
  options: string[];
  answer: string = "";

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
  
  respond(answer: string) {
    this.answer = answer;
    this.bsModalRef.hide();
  }

}
