import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IniciarSesionComponent} from './Components/iniciar-sesion/iniciar-sesion.component';
import {InicioComponent} from './Components/inicio/inicio.component';
import {RegistrarEstudianteComponent} from './Components/registrar-estudiante/registrar-estudiante.component';
import {RegistrarProfesorComponent} from './Components/registrar-profesor/registrar-profesor.component';
import {StudentHomeComponent} from "./Components/student-home/student-home.component";
import {TeacherHomeComponent} from "./Components/teacher-home/teacher-home.component";
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import {AuthGuard} from "./Services/auth.guard";

const routes: Routes = [
  {
    path: '', component: InicioComponent, pathMatch: 'full'
  },
  {path: 'home', component: InicioComponent},
  {path: 'iniciar', component: IniciarSesionComponent},
  {path: 'registrar-profesor', component: RegistrarProfesorComponent},
  {path: 'registrar-estudiante', component: RegistrarEstudianteComponent},
  {path: 'student-home', component: StudentHomeComponent, canActivate: [AuthGuard]},
  {path: 'teacher-home', component: TeacherHomeComponent, canActivate: [AuthGuard]},
  {path: 'teacher-profile/:id', component: TeacherProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
