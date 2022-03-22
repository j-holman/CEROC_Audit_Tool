import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteResponseComponent } from './write-response.component';

describe('WriteResponseComponent', () => {
  let component: WriteResponseComponent;
  let fixture: ComponentFixture<WriteResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
