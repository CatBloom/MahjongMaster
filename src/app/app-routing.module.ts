import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './core/top/top.component';
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';
import { PolicyComponent } from './core/policy/policy.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', title: '雀Tools', component: TopComponent, redirectTo: '', pathMatch: 'full' },
  { path: 'login', title: 'ログイン | 雀Tools', component: LoginComponent },
  { path: 'signup', title: '新規登録 | 雀Tools', component: SignupComponent },
  { path: 'policy', title: 'プライバシーポリシー | 雀Tools', component: PolicyComponent },
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
    title: '設定 | 雀Tools',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./setting/setting.module').then((m) => {
        return m.SettingModule;
      }),
  },
  {
    path: 'forgot-password',
    title: 'パスワード再設定 | 雀Tools',
    component: ForgotPasswordComponent,
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
