import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from "./layouts/login-layout.component";
import { HomeLayoutComponent } from "./layouts/home-layout.component";
import { HomeComponent } from './home/home.component';
import { SupplierComponent } from './supplier/supplier.component';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [ 
      { path: 'home', component: HomeComponent },
      { path: 'supplier', component: SupplierComponent }
    ]
  }, 
  {
    path: '',
    component: LoginLayoutComponent, 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }, 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
