import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateReportsService } from 'src/app/services/create-reports.service';
import { ReportDataService } from 'src/app/services/report-data.service';

export class Report {
  constructor (
    public userId: string,
    public reportId: string,
    public surveyId: number,
    public responseId: string,
    public users: [{
      username: string
    }]
  ) {}
}

@Component({
  selector: 'app-respond-survey',
  templateUrl: './respond-survey.component.html',
  styleUrls: ['./respond-survey.component.css']
})
export class RespondSurveyComponent implements OnInit {

  reports: Report[] = [];
  errorMessage = '';

  constructor(
    private createReportsService: CreateReportsService,
    private reportData: ReportDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeReports();

  }

  initializeReports() {
    this.createReportsService.findAllReports().subscribe(
      response => {
        this.reports = response;
        console.log(this.reports)
        return this.reports;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }

  public onSelect(selectedReport: any) {
    
    this.reportData.setReportData(selectedReport);
    this.router.navigate(['./admin/respond-survey/write-response']);
  }

}

