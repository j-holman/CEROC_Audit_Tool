import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class ReportDataService {

  reportData!: Report;
  constructor() { }

  setReportData(report: Report) {
    this.reportData = report;
  }

  getReportData() {
    console.log(this.reportData);
    return this.reportData;
  }

  
}
