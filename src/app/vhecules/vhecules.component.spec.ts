import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VheculesComponent } from './vhecules.component';

describe('VheculesComponent', () => {
  let component: VheculesComponent;
  let fixture: ComponentFixture<VheculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VheculesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VheculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
