import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';

import { UserDeactivationLastMonthComponent } from './user-deactivation-last-month.component';

describe('UserDeactivationLastMonthComponent', () => {
  let component: UserDeactivationLastMonthComponent;
  let fixture: ComponentFixture<UserDeactivationLastMonthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeactivationLastMonthComponent ],
      imports: [ NgChartsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeactivationLastMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
