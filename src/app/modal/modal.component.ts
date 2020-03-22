import { Component, OnInit ,Output, Input,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Payment } from '../model/payment.model';
import { PaymentUpdateRequest } from '../model/paymentUpdateReq';
import {PaymentService} from '../service/payment.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  reason:string='';
  private sub;
  @Input() public items: number;
  @Output() customerDetailSuccess = new EventEmitter<string>();
  constructor(
    private formBuilder: FormBuilder,private bsModalServiceRef: BsModalService,private paymentService:PaymentService
  ) { }

  ngOnInit() { 
    this.registerForm = this.formBuilder.group({
      reason: ['', '']
      
  });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)')
}
  actionFunction() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.items);
    //this.cancelPayments();
  }

  closeModal() {
    this.bsModalServiceRef._hideModal(1);
  }
  cancelPayments = () => {
    const payReq: PaymentUpdateRequest = {
      id: this.items,
      status: "Closed",
      reason:this.reason
    };
    //console.log(payReq);
    this.sub = this.paymentService.processPayment(payReq);
    this.closeModal();
  };

}
