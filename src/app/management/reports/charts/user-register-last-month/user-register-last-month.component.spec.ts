import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';

import { UserRegisterLastMonthComponent } from './user-register-last-month.component';

describe('UserRegisterLastMonthComponent', () => {
  let component: UserRegisterLastMonthComponent;
  let fixture: ComponentFixture<UserRegisterLastMonthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterLastMonthComponent ],
      imports: [ NgChartsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterLastMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
