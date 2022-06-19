import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColaboratorComponent } from './edit-colaborator.component';

describe('EditColaboratorComponent', () => {
  let component: EditColaboratorComponent;
  let fixture: ComponentFixture<EditColaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColaboratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
