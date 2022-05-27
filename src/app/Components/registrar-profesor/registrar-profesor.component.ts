import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ProfesorService} from 'src/app/Services/Profesor.service';
import {Profesor} from 'src/app/Models/Profesor';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent implements OnInit {

  public profesor: Profesor = new Profesor();
  materias: string = '';
  token: string = '';

  constructor(
    private _profesoresService: ProfesorService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  registrar() {
    if (this.profesor.nombre == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ingreso el nombre',
      })
    } else {
      if (this.profesor.contra == null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ingreso la cantidad!',
        })
      } else {
        if (this.profesor.email == null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ingreso el costo!',
          })
        } else {
          if (this.materias == null) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ingreso la categoria!',
            })
          } else {
            this.profesor.materias = [this.materias];
            this.authService.register(this.profesor.email, this.profesor.contra).subscribe({
              next: res => {
                this.profesor.id = res.localId;
                this.token = res.idToken;
                this._profesoresService.createTeacher(this.profesor).subscribe({
                  next: res => {
                    localStorage.setItem('user', JSON.stringify(this.profesor));
                    localStorage.setItem('role', 'Profesor');
                    localStorage.setItem('token', this.token);
                    this.router.navigate(['/teacher-home']);
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
                console.log(err);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Ha ocurrido un error en el registro del usuario ' + err.error.error.message,
                })
              }
            });

          }
        }
      }
    }
  }

  cancelar() {
    this.router.navigate(['/iniciar']);
  }
}
