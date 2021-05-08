import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVheculesComponent } from './update-vhecules.component';

describe('UpdateVheculesComponent', () => {
  let component: UpdateVheculesComponent;
  let fixture: ComponentFixture<UpdateVheculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVheculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVheculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
