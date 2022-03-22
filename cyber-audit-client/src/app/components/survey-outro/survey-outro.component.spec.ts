import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyOutroComponent } from './survey-outro.component';

describe('SurveyOutroComponent', () => {
  let component: SurveyOutroComponent;
  let fixture: ComponentFixture<SurveyOutroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyOutroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyOutroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
