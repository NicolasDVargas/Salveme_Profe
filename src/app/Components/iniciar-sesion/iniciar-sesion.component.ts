import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/Models/Profesor';
import { Usuario } from 'src/app/Models/Usuario';
import { ProfesorService } from 'src/app/Services/Profesor.service';
import { UsuariosService } from 'src/app/Services/Usuarios.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']

})
export class IniciarSesionComponent implements OnInit {


  public usuario: Usuario = new Usuario();
  public profesor: Profesor = new Profesor();
  public encontrado: boolean = false;
  constructor(public _usuarioService: UsuariosService, public router: Router, public _profesoresService: ProfesorService) { }

  ngOnInit(): void {
  }

  buscar(nombre: string, contra: string) {

    if (nombre == "" || nombre == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Olvidaste llenar el nombre',
      })
    } else {
      if (contra == "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'olvidaste llenar la contraseña',
        })
      } else {
        for (let usu of this._usuarioService.vertedero) {
          if (usu.nombre == nombre && usu.contra == contra) {
            Swal.fire('Bienvenido', 'Has iniciado sesión exitosamente!', 'success')
            localStorage.setItem('user', usu.nombre);
            this.usuario = new Usuario();
            this._usuarioService.actual = usu;
            this.router.navigateByUrl('./home');
            this.encontrado = true;
          }
        }

        for (let profe of this._profesoresService.profesores) {
          if(profe.nombre == nombre && profe.contra == contra) {
            localStorage.setItem('user', profe.nombre);
            Swal.fire('Bienvenido ' + profe.nombre, 'Ha iniciado sesión como profesor@', 'success')
            this.profesor = new Profesor();
            this._profesoresService.profeActual = profe;
            this.router.navigateByUrl('./home');
            this.encontrado = true;
          }
        }

        if (!this.encontrado) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que ese usuario o contraseños son incorrectos',
          })
        }
      }
    }


  }

  cancelar() {
    this.router.navigateByUrl('');
    localStorage.clear();
  }

  registrar_profesor(){
    this.router.navigateByUrl('./registrar-profesor');
  }

  registrar_estudiante(){
    this.router.navigateByUrl('./registrar-estudiante');
  }

}
