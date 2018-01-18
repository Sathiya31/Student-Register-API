import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailDialogComponent } from './add-detail-dialog.component';

describe('AddDetailDialogComponent', () => {
  let component: AddDetailDialogComponent;
  let fixture: ComponentFixture<AddDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
