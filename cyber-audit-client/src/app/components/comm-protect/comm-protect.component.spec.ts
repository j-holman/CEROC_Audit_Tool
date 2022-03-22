import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommProtectComponent } from './comm-protect.component';

describe('CommProtectComponent', () => {
  let component: CommProtectComponent;
  let fixture: ComponentFixture<CommProtectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommProtectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
