import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreatepaymentComponent } from './createpayment/createpayment.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatepaymentComponent,
    PaymentListComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
