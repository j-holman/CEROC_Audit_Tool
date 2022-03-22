import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondSurveyComponent } from './respond-survey.component';

describe('RespondSurveyComponent', () => {
  let component: RespondSurveyComponent;
  let fixture: ComponentFixture<RespondSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
