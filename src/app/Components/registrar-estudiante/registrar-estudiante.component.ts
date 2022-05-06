import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuariosService } from 'src/app/Services/Usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-estudiante',
  templateUrl: './registrar-estudiante.component.html',
  styleUrls: ['./registrar-estudiante.component.css']
})
export class RegistrarEstudianteComponent implements OnInit {

  public estudiante: Usuario = new Usuario();

  constructor(private _estudianteService: UsuariosService, private router: Router) { }

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
                this._estudianteService.agregar(this.estudiante.nombre, this.estudiante.contra, this.estudiante.email, this.estudiante.carrera,this.estudiante.edad,this.estudiante.semestre);
                this.estudiante = new Usuario();
                this.router.navigateByUrl('./inventario');

              }

            }

          }
        }
      }
    }
  }

  cancelar() {
    this.router.navigateByUrl('./iniciar');
  }

}
