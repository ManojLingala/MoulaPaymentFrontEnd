import { Injectable } from '@angular/core';
import {Http,Response} from "@angular/http";
import { map } from "rxjs/operators";
import { PaymentCreateRequest } from '../model/paymentRequest';
import { PaymentUpdateRequest } from '../model/paymentUpdateReq';
import { Observable,BehaviorSubject } from 'rxjs';
import { CreatePaymentResult } from '../model/createPaymentResult';
import {UserDetails} from '../model/userDetails';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  statusSubject: BehaviorSubject<string> =new BehaviorSubject('Initial');
  updateSubject: BehaviorSubject<string> =new BehaviorSubject('None');
  userDetails: BehaviorSubject<UserDetails> =new BehaviorSubject( {name:'Moula User',balance:200});
  base_API_URL:string=environment.api_URL;
  constructor(public http: Http) { 

  }


  public getPayments(dataURL:string){
      return this.http.get(dataURL)
          .pipe(map((res:Response) => res.json()));
              //.catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public create(paymentReq:PaymentCreateRequest){
    console.log(paymentReq);
    let status:string='';
    //const body={PayementCreateRequest:paymentReq};
      return this.http.post(this.base_API_URL+'/payment/create',paymentReq)
     .subscribe((x)=>{this.statusSubject.next( x['statusText'])});
      //return status;  
            //.catch((error:any) => Observable.throw(error || 'Server error'));
}
public processPayment(payReq:PaymentUpdateRequest){
  //const body={PayementCreateRequest:paymentReq};
 console.log(payReq.id);
   this.http.put(this.base_API_URL+'/payment/'+payReq.id,payReq)
   .subscribe((x)=>{this.updateSubject.next( x['statusText'])});
      
          //.catch((error:any) => Observable.throw(error || 'Server error'));
}
}
