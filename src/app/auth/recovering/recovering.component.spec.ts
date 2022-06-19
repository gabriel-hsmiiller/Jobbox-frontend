import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveringComponent } from './recovering.component';

describe('RecoveringComponent', () => {
  let component: RecoveringComponent;
  let fixture: ComponentFixture<RecoveringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
