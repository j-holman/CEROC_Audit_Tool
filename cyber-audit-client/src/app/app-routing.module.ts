import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccMgmtComponent } from './components/acc-mgmt/acc-mgmt.component';
import { AccessControlComponent } from './components/access-control/access-control.component';
import { AuditAccountComponent } from './components/audit-account/audit-account.component';
import { CommProtectComponent } from './components/comm-protect/comm-protect.component';
import { ConfigMgmtComponent } from './components/config-mgmt/config-mgmt.component';
import { ContinuityComponent } from './components/continuity/continuity.component';
import { IncidentResponseComponent } from './components/incident-response/incident-response.component';
import { LoginComponent } from './components/login/login.component';
import { MonitorMalwareComponent } from './components/monitor-malware/monitor-malware.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { PhysSecurityComponent } from './components/phys-security/phys-security.component';
import { PlanningComponent } from './components/planning/planning.component';
import { PolicyComponent } from './components/policy/policy.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { EditSurveyComponent } from './components/edit-survey/edit-survey.component';
import { UserMgmtComponent } from './components/user-mgmt/user-mgmt.component';
import { RespondSurveyComponent } from './components/respond-survey/respond-survey.component';
import { SurveyOutroComponent } from './components/survey-outro/survey-outro.component';
import { SurveyIntroComponent } from './components/survey-intro/survey-intro.component';
import { WriteResponseComponent } from './components/write-response/write-response.component';
import { AboutComponent } from './components/about/about.component';
import { MyreportsComponent } from './components/myreports/myreports.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'AccMgmt', component: AccMgmtComponent, canActivate: [AuthGuard] },
  { path: 'AccessControl', component: AccessControlComponent, canActivate: [AuthGuard] },
  { path: 'audit-account', component: AuditAccountComponent, canActivate: [AuthGuard] },
  { path: 'comm-protect', component: CommProtectComponent, canActivate: [AuthGuard] },
  { path: 'config-mgmt', component: ConfigMgmtComponent, canActivate: [AuthGuard] },
  { path: 'continuity', component: ContinuityComponent, canActivate: [AuthGuard] },
  { path: 'incident-response', component: IncidentResponseComponent, canActivate: [AuthGuard] },
  { path: 'monitor-malware', component: MonitorMalwareComponent, canActivate: [AuthGuard] },
  { path: 'personnel', component: PersonnelComponent, canActivate: [AuthGuard] },
  { path: 'phys-security', component: PhysSecurityComponent, canActivate: [AuthGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard] },
  { path: 'policy', component: PolicyComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'admin/create-survey', component: CreateSurveyComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'admin/edit-survey', component: EditSurveyComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'admin/user-mgmt', component: UserMgmtComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'admin/respond-survey', component: RespondSurveyComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'survey-outro', component: SurveyOutroComponent, canActivate: [AuthGuard] },
  { path: 'survey-intro', component: SurveyIntroComponent, canActivate: [AuthGuard] },
  { path: 'admin/respond-survey/write-response', component: WriteResponseComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'myreports', component: MyreportsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
