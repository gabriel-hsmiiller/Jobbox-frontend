import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { UsersComponent } from './users/users.component';
import { JobsComponent } from './jobs/jobs.component';
import { ListComponent } from './list/list.component';
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from '../shared/shared.module';
import { JobStatusComponent } from './reports/charts/job-status/job-status.component';
import { NgChartsModule } from 'ng2-charts';
import { UserRegisterComponent } from './reports/charts/user-register/user-register.component';
import { UserRegisterLastMonthComponent } from './reports/charts/user-register-last-month/user-register-last-month.component';
import { VisualizeComponent } from './reports/visualize/visualize.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { UserDeactivationLastMonthComponent } from './reports/charts/user-deactivation-last-month/user-deactivation-last-month.component';
import { UserDeactivationComponent } from './reports/charts/user-deactivation/user-deactivation.component';


@NgModule({
  declarations: [
    ManagementComponent,
    UsersComponent,
    JobsComponent,
    ListComponent,
    ReportsComponent,
    JobStatusComponent,
    UserRegisterComponent,
    UserRegisterLastMonthComponent,
    VisualizeComponent,
    UserDeactivationLastMonthComponent,
    UserDeactivationComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    NgChartsModule,
    NgxPrintElementModule
  ]
})
export class ManagementModule { }
