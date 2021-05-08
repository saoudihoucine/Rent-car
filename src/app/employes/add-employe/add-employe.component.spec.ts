import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeComponent } from './add-employe.component';

describe('AddEmployeComponent', () => {
  let component: AddEmployeComponent;
  let fixture: ComponentFixture<AddEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
