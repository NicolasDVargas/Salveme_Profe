import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProfesorService } from 'src/app/Services/Profesor.service';
import { Profesor } from 'src/app/Models/Profesor';

@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent implements OnInit {

  public profesor: Profesor = new Profesor();

  constructor(public _profesoresService: ProfesorService, public router: Router) { }

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
          if (this.profesor.Materias == null) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se ingreso la categoria!',
            })
          } else {
            this._profesoresService.agregar(this.profesor.nombre,this.profesor.contra,this.profesor.Materias,this.profesor.email);
            this.profesor = new Profesor;
            this.router.navigateByUrl('./inventario');

          }
        }
      }
    }
  }

  cancelar() {
    this.router.navigateByUrl('./iniciar');
  }
}
