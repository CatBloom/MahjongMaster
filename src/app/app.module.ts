// modules
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
// components
import { AppComponent } from './app.component';
import { TopComponent } from './pages/top/top.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
// pipes
import { DatePipe } from '@angular/common';
// interceptor
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { NoticeInterceptor } from './shared/interceptor/notice.interceptor';
// firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, TopComponent, LoginComponent, SignupComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    SharedModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoticeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
