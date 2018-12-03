import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
  },
  {
    path: 'register',
    loadChildren: './modules/register/register.module#RegisterModule'
  },
  {
    path: 'after',
    loadChildren: './modules/after/after.module#AfterModule'
  },
  {
    path: 'competition',
    loadChildren: './modules/competition/competition.module#CompetitionModule'
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
