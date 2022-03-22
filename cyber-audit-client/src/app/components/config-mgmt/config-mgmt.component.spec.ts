import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMgmtComponent } from './config-mgmt.component';

describe('ConfigMgmtComponent', () => {
  let component: ConfigMgmtComponent;
  let fixture: ComponentFixture<ConfigMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
