import { AlertModule } from 'ngx-bootstrap/alert';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { MessageService } from './services/message.service';
import { SupplierService } from './services/supplier.service';
import { UserService } from './services/user.service';

import { AppRoutingModule } from './app-routing.module';

import { LoginLayoutComponent } from "./layouts/login-layout.component";
import { HomeLayoutComponent } from "./layouts/home-layout.component";

import { AlertComponent } from './alert/alert.component';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SupplierComponent } from './supplier/supplier.component';
import { RegisterComponent } from './register/register.component';

import { JwtInterceptor } from './jwt.interceptor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GlobalEventsManager } from './global-events-manager'; 

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    ConfirmDialogComponent,
    HomeComponent,
    HomeLayoutComponent,
    LoadingComponent,
    LoginComponent,
    LoginLayoutComponent,
    NavbarComponent,
    RegisterComponent,
    SupplierComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    AlertService,
    AppComponent,
    LoadingService,
    GlobalEventsManager,
    MessageService,
    SupplierService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AlertComponent,
    LoadingComponent,
    ConfirmDialogComponent
  ]
})
export class AppModule { }
