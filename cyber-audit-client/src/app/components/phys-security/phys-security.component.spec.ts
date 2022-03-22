import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysSecurityComponent } from './phys-security.component';

describe('PhysSecurityComponent', () => {
  let component: PhysSecurityComponent;
  let fixture: ComponentFixture<PhysSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
