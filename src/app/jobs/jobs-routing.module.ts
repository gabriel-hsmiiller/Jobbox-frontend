import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
      { path: 'colaborator/edit/:id', component: EditColaboratorComponent },
      { path: 'client/edit/:id', component: EditClientComponent },
      { path: 'view/:id', component: ViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
