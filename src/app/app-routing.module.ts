import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './core/top/top.component';
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: TopComponent, redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'details',
    loadChildren: () =>
      import('./details/details.module').then((m) => {
        return m.DetailsModule;
      }),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => {
        return m.AdminModule;
      }),
  },
  {
    path: 'setting',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./setting/setting.module').then((m) => {
        return m.SettingModule;
      }),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
