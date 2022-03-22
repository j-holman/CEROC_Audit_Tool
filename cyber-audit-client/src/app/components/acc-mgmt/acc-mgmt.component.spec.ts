import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccMgmtComponent } from './acc-mgmt.component';

describe('AccMgmtComponent', () => {
  let component: AccMgmtComponent;
  let fixture: ComponentFixture<AccMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
