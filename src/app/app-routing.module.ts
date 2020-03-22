import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatepaymentComponent} from './createpayment/createpayment.component';
import { PaymentListComponent } from './payment-list/payment-list.component';


const routes: Routes = [
 
  { path: 'create', component: CreatepaymentComponent },
  { path: 'paymentList', component: PaymentListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
