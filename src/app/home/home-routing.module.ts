import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../security/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
      { path: 'home', loadChildren: () => import('../news/news.module').then(m => m.NewsModule) },
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
      { path: 'job', loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsModule) },
      { path: 'management', loadChildren: () => import('../management/management.module').then(m => m.ManagementModule) },
      // { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
