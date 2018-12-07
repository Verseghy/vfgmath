import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeGuard } from './guards/time.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [TimeGuard],
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
    canActivate: [TimeGuard],
  },
  {
    path: 'after',
    loadChildren: './modules/after/after.module#AfterModule',
    canActivate: [TimeGuard],
  },
  {
    path: 'competition',
    loadChildren: './modules/competition/competition.module#CompetitionModule',
    canActivate: [TimeGuard],
  },
  {
    path: '**',
    loadChildren: './modules/notfound/notfound.module#NotfoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
