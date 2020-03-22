import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { PaymentCreateRequest } from '../model/paymentRequest';
import { PaymentService } from '../service/payment.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RouteConfigLoadEnd } from '@angular/router';
import {Router} from '@angular/router'
import { UserDetails } from '../model/userDetails';

@Component({
  selector: 'app-createpayment',
  templateUrl: './createpayment.component.html',
  styleUrls: ['./createpayment.component.scss']
})
export class CreatepaymentComponent implements OnInit {

  createPaymentStatus:string;
  paymentForm: FormGroup;
  submitted = false;
  customerInfo:UserDetails;
  createStatus='';
  constructor(private formBuilder: FormBuilder,private paymentService:PaymentService,private router: Router) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({    
      amount:  ['',
        [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]
        ],
      date: ['', Validators.required]
     
  });
  this.paymentService.userDetails.subscribe((x)=>this.customerInfo=x);
  this.paymentService.statusSubject.subscribe((x)=>{
    this.createStatus=x;
    console.log(this.createStatus);
    if(this.createStatus=='OK')
    {
      this.router.navigate(['/paymentList']);
      this.paymentService.statusSubject.next('Set back to Initial');
      console.log(this.customerInfo.balance);
      //console.log(this.paymentForm.controls.amount.value);
      this.customerInfo.balance=(this.customerInfo.balance>this.paymentForm.controls.amount.value)? this.customerInfo.balance-this.paymentForm.controls.amount.value:this.customerInfo.balance;
      this.paymentForm.get('amount').setValue(0);
    }
  });
  
  }
  get f() { return this.paymentForm.controls; }
  createPayment() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.paymentForm.invalid) {
        return;
    }
     const payReq: PaymentCreateRequest = {
        amount: this.paymentForm.controls.amount.value,
        date: this.paymentForm.controls.date.value,
        sufficientBalance:(this.customerInfo.balance>this.paymentForm.controls.amount.value)?true:false
      };
      //console.log(payReq);
      this.paymentService.create(payReq);
    
    //this.closeModal();
  }

}
