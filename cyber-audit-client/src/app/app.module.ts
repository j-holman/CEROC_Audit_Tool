import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';


import { AccMgmtComponent } from './components/acc-mgmt/acc-mgmt.component';
import { AccessControlComponent } from './components/access-control/access-control.component';
import { AuditAccountComponent } from './components/audit-account/audit-account.component';
import { CommProtectComponent } from './components/comm-protect/comm-protect.component';
import { ConfigMgmtComponent } from './components/config-mgmt/config-mgmt.component';
import { ContinuityComponent } from './components/continuity/continuity.component';
import { HomeComponent } from './components/home/home.component';
import { IncidentResponseComponent } from './components/incident-response/incident-response.component';
import { LoginComponent } from './components/login/login.component';
import { MonitorMalwareComponent } from './components/monitor-malware/monitor-malware.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { PhysSecurityComponent } from './components/phys-security/phys-security.component';
import { PlanningComponent } from './components/planning/planning.component';
import { PolicyComponent } from './components/policy/policy.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { GetQuestionsService } from './services/get-questions.service';
import { SurveyIntroComponent } from './components/survey-intro/survey-intro.component';
import { SurveyOutroComponent } from './components/survey-outro/survey-outro.component';
import { EditSurveyComponent } from './components/edit-survey/edit-survey.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { UserMgmtComponent } from './components/user-mgmt/user-mgmt.component';
import { RespondSurveyComponent } from './components/respond-survey/respond-survey.component';
import { PostReportService } from './services/post-report.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateReportsService } from './services/create-reports.service';
import { ReportDataService } from './services/report-data.service';
import { WriteResponseComponent } from './components/write-response/write-response.component';
import { RoleGuard } from './guards/role.guard';
import { SurveysService } from './services/surveys.service';
import { MyreportsComponent } from './components/myreports/myreports.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AccMgmtComponent,
    AccessControlComponent,
    AuditAccountComponent,
    CommProtectComponent,
    ConfigMgmtComponent,
    ContinuityComponent,
    HomeComponent,
    IncidentResponseComponent,
    LoginComponent,
    MonitorMalwareComponent,
    PersonnelComponent,
    PhysSecurityComponent,
    PlanningComponent,
    PolicyComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileComponent,
    SurveyIntroComponent,
    SurveyOutroComponent,
    EditSurveyComponent,
    CreateSurveyComponent,
    UserMgmtComponent,
    RespondSurveyComponent,
    WriteResponseComponent,
    MyreportsComponent,
    FooterComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    UserService, 
    ValidateService, 
    AuthService, 
    AuthGuard,
    RoleGuard,
    GetQuestionsService,
    PostReportService, 
    CreateReportsService,
    ReportDataService,
    SurveysService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
