import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyIntroComponent } from './survey-intro.component';

describe('SurveyIntroComponent', () => {
  let component: SurveyIntroComponent;
  let fixture: ComponentFixture<SurveyIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
