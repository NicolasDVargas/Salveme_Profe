import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profesor} from 'src/app/Models/Profesor';
import {Usuario} from 'src/app/Models/Usuario';
import {ProfesorService} from 'src/app/Services/Profesor.service';
import {UsuariosService} from 'src/app/Services/Usuarios.service';

import Swal from 'sweetalert2';
import {AuthService} from "../../Services/auth.service";


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']

})
export class IniciarSesionComponent implements OnInit {


  public usuario: Usuario = new Usuario();
  public profesor: Profesor = new Profesor();
  public encontrado: boolean = false;
  token: string = '';

  constructor(
    private _usuarioService: UsuariosService,
    private router: Router,
    private _profesoresService: ProfesorService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  buscar(nombre: string, contra: string) {

    if (nombre === "" || nombre === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Olvidaste llenar el nombre',
      })
    } else {
      if (contra === "") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'olvidaste llenar la contraseña',
        })
      } else {
        this.authService.login(nombre, contra).subscribe({
          next: res => {
            this.token = res.idToken;
            this._usuarioService.getUser(nombre).subscribe({
              next: res => {
                const keys = Object.keys(res);
                if (keys.length !== 0) {
                  const name = keys[0];
                  localStorage.setItem('user', JSON.stringify(res[name]));
                  localStorage.setItem('role', 'Estudiante');
                  localStorage.setItem('token', this.token);
                  Swal.fire('Bienvenido', 'Has iniciado sesión como estudiante!', 'success');
                  this.encontrado = true;
                  this.router.navigate(['/student-home']);
                }
              }
            });
            this._profesoresService.getTeacher(nombre).subscribe({
              next: res => {
                const keys = Object.keys(res);
                if (keys.length !== 0) {
                  const name = keys[0];
                  localStorage.setItem('user', JSON.stringify(res[name]));
                  localStorage.setItem('role', 'Profesor');
                  localStorage.setItem('token', this.token);
                  Swal.fire('Bienvenido', 'Has iniciado sesión como profesor!', 'success');
                  this.encontrado = true;
                  this.router.navigate(['/teacher-home']);
                }
              }
            });
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Parece que ese usuario o contraseños son incorrectos',
            })
          }
        });

        if (!this.encontrado) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no encontrado',
          });
        }
      }
    }
  }

  cancelar() {
    this.router.navigate(['']);
    localStorage.clear();
  }

  registrar_profesor() {
    this.router.navigate(['/registrar-profesor']);
  }

  registrar_estudiante() {
    this.router.navigate(['/registrar-estudiante']);
  }
}
