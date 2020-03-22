import { Component, OnInit, OnDestroy } from '@angular/core';
import {PaymentService} from '../service/payment.service';
import { Payment } from '../model/payment.model';
import { PaymentUpdateRequest } from '../model/paymentUpdateReq';
import {Router,NavigationEnd} from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';
import {ModalComponent} from '../modal/modal.component';
import { UserDetails } from '../model/userDetails';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  updateStatus='';
  customerInfo:UserDetails;
  public cancelModal:BsModalRef;
  constructor( private paymentService:PaymentService,private router: Router,private modalService: BsModalService) { 
    
  }
  private sub;
  payments:Payment
  ngOnInit() {
    this.getPastPayments();
    this.paymentService.userDetails.subscribe((x)=>this.customerInfo=x);
    this.paymentService.updateSubject.subscribe((x)=>{
      this.updateStatus=x;
      console.log(this.updateStatus);
      if(this.updateStatus=='OK')
      {
        this.paymentService.updateSubject.next('Initial');
        this.getPastPayments();
       
      }
    });
  }
  getPastPayments = () => {
    this.sub = this.paymentService.getPayments('http://localhost:51797/api/payment/')
        .subscribe(res => {
          this.payments = res;
          console.log(res);
        })
};
processPayments = (payment:Payment) => {
  console.log(payment.id);
  const payReq: PaymentUpdateRequest = {
    id: payment.id,
    status: "Processed",
    reason:"Processed"
  };
  //console.log(payReq);
  this.sub = this.paymentService.processPayment(payReq);


      
};

cancelPayments = (payment:Payment) => {
  console.log(payment.id);
  this.openModal(payment.id);
  
      
};
openModal(id:number) {
  // const dialogConfig = new MatDialogConfig();
  // // The user can't close the dialog by clicking outside its body
  // dialogConfig.disableClose = true;
  // dialogConfig.id = "modal-component";
  // dialogConfig.height = "600px";
  // dialogConfig.width = "600px";
  // // https://material.angular.io/components/dialog/overview
  // const modalDialog = this.matDialog.open (ModalComponent, dialogConfig);

  this.cancelModal  =this.modalService.show(ModalComponent, {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true,
      initialState:{items:id}
    });
   
  
}
}
