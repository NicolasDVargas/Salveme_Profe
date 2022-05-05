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

  registrar(usuario: Usuario) {
    var yaExiste: boolean = false;
    debugger;
    if (usuario.nombre == null || usuario.nombre == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha ingresado nombre!',
      })
    } else {
      if (usuario.contra == null || usuario.contra == "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha ingresado una contraseña valida!',
        })
      } else {
        if (usuario.email == null || usuario.contra == "") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha ingresado un email valida!',
          })
        } else {
          for (let usu of this._usuarioService.vertedero) {
            if (usu.nombre == usuario.nombre) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ese nombre ya existe!',
              })
              yaExiste = true;
            }
          }
          for (let profe of this._profesoresService.profesores) {
            if( profe.nombre == usuario.nombre && profe.contra == usuario.contra) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ese ya existe!',
              })
              yaExiste = true;

            }
          }
          if (!yaExiste) {
            this._usuarioService.agregar(this.usuario);
            localStorage.setItem('user', this.usuario.nombre);
            Swal.fire('Bienvenido ' + usuario.nombre, 'El registro a sido exitoso', 'success')
            this._usuarioService.actual = usuario;
            this.usuario = new Usuario();
            this.router.navigateByUrl('./home');
          }
        }
      }
    }
  }
}
