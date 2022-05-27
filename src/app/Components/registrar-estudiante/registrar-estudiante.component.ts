import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from 'src/app/Models/Usuario';
import {UsuariosService} from 'src/app/Services/Usuarios.service';
import Swal from 'sweetalert2';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-registrar-estudiante',
  templateUrl: './registrar-estudiante.component.html',
  styleUrls: ['./registrar-estudiante.component.css']
})
export class RegistrarEstudianteComponent implements OnInit {

  public estudiante: Usuario = new Usuario();
  token: string = '';

  constructor(
    private _estudianteService: UsuariosService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  registrar() {
    if (this.estudiante.nombre == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ingreso el nombre',
      })
    } else {
      if (this.estudiante.contra == null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ingreso la contraseña!',
        })
      } else {
        if (this.estudiante.email == null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ingreso el email!',
          })
        } else {
          if (this.estudiante.carrera == null) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ingreso la carrera!',
            })
          } else {
            if (this.estudiante.edad == null) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ingreso la edad!',
              })
            } else {
              if (this.estudiante.semestre == null) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No se ingreso el semestre!',
                })
              } else {
                this.authService.register(this.estudiante.email, this.estudiante.contra).subscribe({
                  next: res => {
                    this.estudiante.id = res.localId;
                    this.token = res.idToken;
                    this._estudianteService.createUser(this.estudiante).subscribe({
                      next: res => {
                        localStorage.setItem('user', JSON.stringify(this.estudiante));
                        localStorage.setItem('role', 'Estudiante');
                        localStorage.setItem('token', this.token);
                        this.router.navigate(['/student-home']);
                      },
                      error: err => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Ha ocurrido un error en el registro del usuario ' + err.error.error.message,
                        })
                      }
                    })
                  },
                  error: err => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Ha ocurrido un error en el registro del usuario ' + err.error.error.message,
                    })
                  }
                })
              }

            }

          }
        }
      }
    }
  }

  cancelar() {
    this.router.navigate(['/iniciar']);
  }

}
