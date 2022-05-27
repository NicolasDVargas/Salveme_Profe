import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfesorService} from 'src/app/Services/Profesor.service';
import {UsuariosService} from 'src/app/Services/Usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public _profesorService: ProfesorService, public _usuService: UsuariosService) {
  }

  ngOnInit(): void {
  }

  home() {
    this.router.navigate(['/home'])
  }

  inventario() {
    this.router.navigate(['/inventario'])
  }

  cerrarSesion() {
    localStorage.clear();
    this._profesorService.limpiar();
    this._usuService.limpiar();
    this.router.navigate(['']);
  }

  revisarProfe(): boolean {
    var nomUsuario = localStorage.getItem('user');
    if (nomUsuario != null) {
      for (let prof of this._profesorService.profesores) {
        if (prof.nombre == nomUsuario) {
          return true;
        }
      }
    }
    return false;
  }

  carrito() {
    this.router.navigate(["/carrito"])
  }

  perfil() {
    this.router.navigate(["/perfil"])
  }

  revisar(): boolean {
    var nomUsuario = localStorage.getItem('user');
    if (nomUsuario != null) {
      for (let usu of this._usuService.vertedero) {
        if (usu.nombre == nomUsuario) {
          return true;
        }
      }
    }
    return false;
  }

  Inicio() {
    localStorage.clear();
    this.router.navigate(['/iniciar']);
  }

}
