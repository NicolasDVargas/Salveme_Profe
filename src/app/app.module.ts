import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './Components/header/header.component';
import {IniciarSesionComponent} from './Components/iniciar-sesion/iniciar-sesion.component';
import {RegistrarProfesorComponent} from './Components/registrar-profesor/registrar-profesor.component';
import {RegistrarEstudianteComponent} from './Components/registrar-estudiante/registrar-estudiante.component';
import {HttpClientModule} from "@angular/common/http";
import {UsuariosService} from "./Services/Usuarios.service";
import {ProfesorService} from "./Services/Profesor.service";
import {AuthService} from "./Services/auth.service";
import {StudentHomeComponent} from './Components/student-home/student-home.component';
import {TeacherHomeComponent} from './Components/teacher-home/teacher-home.component';
import {AuthGuard} from "./Services/auth.guard";
import {InicioComponent} from "./Components/inicio/inicio.component";
import { CreateClassModalComponent } from './Components/create-class-modal/create-class-modal.component';
import { ReviewModalComponent } from './Components/review-modal/review-modal.component';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    HeaderComponent,
    RegistrarProfesorComponent,
    RegistrarEstudianteComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    InicioComponent,
    CreateClassModalComponent,
    ReviewModalComponent,
    TeacherProfileComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UsuariosService,
    ProfesorService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
