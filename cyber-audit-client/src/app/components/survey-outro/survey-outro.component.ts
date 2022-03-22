import { Component, OnInit } from '@angular/core';
import { PostReportService } from 'src/app/services/post-report.service';
import { FormControl, FormBuilder, FormGroup, FormArray, ValidatorFn, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-outro',
  templateUrl: './survey-outro.component.html',
  styleUrls: ['./survey-outro.component.css']
})
export class SurveyOutroComponent implements OnInit {
  forms: FormGroup[] = []

  constructor(private postReportService: PostReportService) { }

  ngOnInit(): void {
    console.log(this.forms.length);
  }

  addItem(newItem: FormGroup) {
    this.forms.push(newItem);
  }
}
