import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotDetailModalComponent } from './snapshot-detail-modal.component';

describe('SnapshotDetailModalComponent', () => {
  let component: SnapshotDetailModalComponent;
  let fixture: ComponentFixture<SnapshotDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
