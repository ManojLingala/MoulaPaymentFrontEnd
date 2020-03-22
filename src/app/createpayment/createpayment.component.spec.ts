import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepaymentComponent } from './createpayment.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreatepaymentComponent', () => {
  let component: CreatepaymentComponent;
  let fixture: ComponentFixture<CreatepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ CreatepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
