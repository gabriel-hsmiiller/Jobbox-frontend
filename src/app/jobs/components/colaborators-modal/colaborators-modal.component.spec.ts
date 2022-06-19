import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboratorsModalComponent } from './colaborators-modal.component';

describe('ColaboratorsModalComponent', () => {
  let component: ColaboratorsModalComponent;
  let fixture: ComponentFixture<ColaboratorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboratorsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboratorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
