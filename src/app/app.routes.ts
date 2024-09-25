import { Routes } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

export const routes: Routes = [
    { path: '', title: "Login", component: LoginComponent },
    { path: 'login', title: "Login", component: LoginComponent },
    { path: 'signup', title: "Sign Up", component: SignupComponent }
];

