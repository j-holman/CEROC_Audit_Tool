import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAccountComponent } from './audit-account.component';

describe('AuditAccountComponent', () => {
  let component: AuditAccountComponent;
  let fixture: ComponentFixture<AuditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
