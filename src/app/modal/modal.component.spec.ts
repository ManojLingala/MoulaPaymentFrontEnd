import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule ,ReactiveFormsModule, } from '@angular/forms';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap';
import { ModalComponent } from './modal.component';

class MockBsModalService extends BsModalService {
  isAuthenticated() {
    return 'Mocked';
  }
}
describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule, ReactiveFormsModule,ModalModule],
      declarations: [ ModalComponent ],
      providers: [BsModalService]
      
    })
    .compileComponents();
    
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    TestBed.overrideComponent(
      ModalComponent,
      { set: { providers: [{ provide: BsModalService, useClass: MockBsModalService }] } }
  );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
