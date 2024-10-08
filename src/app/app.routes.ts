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
import { ListbulletsComponent } from './Components/admin/admincheck/listcheck/listbullets/listbullets.component';
import { SectionsByCatComponent } from './Components/conductor/sections-by-cat/sections-by-cat.component';
import { PerfilVehiculoComponent } from './Components/admin/flota/perfil-vehiculo/perfil-vehiculo.component';
import { FormresponsesComponent } from './Components/admin/formresponses/formresponses.component';
import { AgregarConductorComponent } from './Components/admin/agregar-conductor/agregar-conductor.component';

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
  { path: 'agregar-vehiculo', component:CrearVehiculoComponent, canActivate:[authGuard]},
  { path: 'reporte', component: ReporteComponent, canActivate: [authGuard]},
  { path: 'sections/:sectionId', component: ListbulletsComponent, canActivate: [authGuard]},
  { path: 'formresponses', component: FormresponsesComponent, canActivate: [authGuard]},
  { path: 'inspeccion2/:categoryId/:vehicle', component: SectionsByCatComponent, canActivate: [authGuard]},
  { path: 'perfil-vehiculo/:id', component: PerfilVehiculoComponent, canActivate: [authGuard]},
  { path: 'agregar-conductor', component: AgregarConductorComponent, canActivate: [authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}