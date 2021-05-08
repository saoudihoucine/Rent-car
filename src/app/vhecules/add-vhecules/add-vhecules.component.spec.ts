import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVheculesComponent } from './add-vhecules.component';

describe('AddVheculesComponent', () => {
  let component: AddVheculesComponent;
  let fixture: ComponentFixture<AddVheculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVheculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVheculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
