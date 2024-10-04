import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './Components/admin/home/home.component';
import { ConductoresComponent } from './Components/admin/conductores/conductores.component';
import { FlotaComponent } from './Components/admin/flota/flota.component';
import { InspeccionComponent } from './Components/conductor/inspeccion/inspeccion.component';
import { CrearVehiculoComponent } from './Components/admin/flota/crear-vehiculo/crear-vehiculo.component';
import { HomecComponent } from './Components/conductor/home/homec.component';
import { ReporteComponent } from './Components/conductor/reporte/reporte.component';
import { AdmincheckComponent } from './Components/admin/admincheck/admincheck.component';
import { ListcheckComponent } from './Components/admin/admincheck/listcheck/listcheck.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', title: "Login", component: LoginComponent },
  { path: 'signup', title: "Sign Up", component: SignupComponent },
  { path: 'my-profile', title: "Personal Profile", component: ProfileComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'homec', component: HomecComponent, canActivate: [authGuard]},
  { path: 'conductores', component: ConductoresComponent, canActivate:[authGuard]},
  { path: 'flota', component: FlotaComponent, canActivate: [authGuard]},
  { path: 'admincheck', component: AdmincheckComponent, canActivate: [authGuard]},
  { path: 'listcheck/:categoryId', component: ListcheckComponent, canActivate: [authGuard]},
  { path: 'inspeccion', component: InspeccionComponent, canActivate: [authGuard]},
  { path: 'crear-flota', component:CrearVehiculoComponent, canActivate:[authGuard]},
  { path: 'reporte', component: ReporteComponent, canActivate: [authGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}