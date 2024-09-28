import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { FlotaComponent } from './Components/admin/flota/flota.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', title: "Login", component: LoginComponent },
  { path: 'signup', title: "Sign Up", component: SignupComponent },
  { path: 'my-profile', title: "Personal Profile", component: ProfileComponent, canActivate: [authGuard] },
  { path:'flota', component: FlotaComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
