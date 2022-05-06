import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './Components/iniciar-sesion/iniciar-sesion.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { RegistrarProfesorComponent } from './Components/registrar-profesor/registrar-profesor.component';

const routes: Routes = [
  {
    path: '',component: InicioComponent
  },
  {path: './home',component: InicioComponent},
  {path: './iniciar',component: IniciarSesionComponent},
  {path: './registrar-profesor',component:RegistrarProfesorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
