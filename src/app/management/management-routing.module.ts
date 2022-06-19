import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { ListComponent } from './list/list.component';
import { ManagementComponent } from './management.component';
import { ReportsComponent } from './reports/reports.component';
import { VisualizeComponent } from './reports/visualize/visualize.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component: ManagementComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'users', component: UsersComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/:id', component: VisualizeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
