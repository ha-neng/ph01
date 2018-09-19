import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[] = [];
  model: any;
  title: string;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number;
  countries: string[] = ['TH', 'US', 'UK'];

  answers: string[] = [];

  modalRef: BsModalRef;

  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private modalService: BsModalService,
    private supplierService: SupplierService) {
  }

  ngOnInit() {
    this.onGetData();
  }

  onGetData() {
    this.loadingService.show('loading...');
    this.supplierService.getSupplier().subscribe(
      result => {
        console.log(result);
        this.suppliers = result;
        console.log(this.suppliers);
      },
      err => {
        console.log(err);
        //this.alertService.alert("คำเตือน!", err.error);
      }, () => {
        console.log('done');
        this.loadingService.hide();
      });
  }

  onNew(template: TemplateRef<any>) {

    var date = new Date();
    // var ngbDateStruct = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear() };
    this.model = new Supplier();
    //  this.model.created = ngbDateStruct;

    this.modalRef = this.modalService.show(template);
    this.title = 'New';
    this.submitType = 'Save';
  }

  onEdit(index: number, template: TemplateRef<any>) {

    this.title = 'Edit';
    this.selectedRow = index;
    this.model = new Supplier();
    this.model = Object.assign({}, this.suppliers[this.selectedRow]);
    this.submitType = 'Update';

    this.modalRef = this.modalService.show(template);
  }

  confirm(index: number) {
    this.messageService.confirm("กรุณายืนยัน", "ต้องการลบข้อมูล ?", ["Yes", "No"])
      .subscribe((answer) => {
        this.answers.push(answer);
        if (answer == "Yes") {
          this.onDelete(index);
        }
      });
  }

  onSave() {
    if (this.submitType === 'Save') {
      this.supplierService.save(this.model).subscribe(result => {
        this.onGetData();
        this.onCancel();
      }, (err: HttpErrorResponse) => {
        this.alertService.alert(
          "คำเตือน!",
          err.error)
          .subscribe((answer) => {
            console.log(answer);
          });
      });
    } else {
      this.supplierService.update(this.model).subscribe(result => {
        console.log(result);
        this.onGetData();
        this.onCancel();
      }, (err: HttpErrorResponse) => {
        this.alertService.alert(
          "คำเตือน!",
          err.error)
          .subscribe((answer) => {
            console.log(answer);
          });
      });
    }
    this.showNew = false;
  }

  onDelete(supplierId: number) {
    this.supplierService.delete(supplierId).subscribe(result => {
      console.log(result);
      this.alertService.alert("ลบข้อมูลสำเร็จ !", "").subscribe(() => {
        setTimeout(() => {
          this.onGetData();
        }, 1000);
      });
    }, (err: HttpErrorResponse) => {
      this.alertService.alert(
        "คำเตือน!",
        err.error)
        .subscribe((answer) => {
          console.log(answer);
        });
    });
  }

  onCancel() {
    this.title = '';
    this.modalRef.hide();
  }

  onChangeCountry(country: string) {
    // this.supplierModel.country = country;
  }

}// end SupplierComponent Class

