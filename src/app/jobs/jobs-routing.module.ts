import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';
import { CreateComponent } from './components/create/create.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditColaboratorComponent } from './components/edit-colaborator/edit-colaborator.component';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { JobsComponent } from './jobs.component';

const routes: Routes = [
  { 
    path: '', 
    component: JobsComponent,
    children: [
      { path: '', component: ListComponent, canActivate: [AuthGuard] },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
      { path: 'colaborator/edit/:id', component: EditColaboratorComponent, canActivate: [AuthGuard] },
      { path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard] },
      { path: 'view/:id', component: ViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
