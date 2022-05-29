import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditColaboratorComponent } from './components/edit-colaborator/edit-colaborator.component';
import { ViewComponent } from './components/view/view.component';
import { ListComponent } from './components/list/list.component';
import { ColaboratorsModalComponent } from './components/colaborators-modal/colaborators-modal.component';
import { SnapshotDetailModalComponent } from './components/snapshot-detail-modal/snapshot-detail-modal.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';


@NgModule({
  declarations: [
    JobsComponent,
    CreateComponent,
    EditClientComponent,
    EditColaboratorComponent,
    ViewComponent,
    ListComponent,
    ColaboratorsModalComponent,
    SnapshotDetailModalComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ]
})
export class JobsModule { }
