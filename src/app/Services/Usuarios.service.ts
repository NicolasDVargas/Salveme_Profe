import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public vertedero: Usuario[] = [];
  public actual: Usuario;
  public id:number = 0;
  
  constructor() { }

  public usuario:Usuario ;

  public agregar(nombre: string,contra: string,email: string, carrera: string, edad:number, semestre:number){
    this.usuario.crear(this.id,nombre,contra,email, carrera, edad, semestre);
    this.id++;
    this.vertedero.push(this.usuario);

  }

  public obtener(){
    return this.vertedero;
  }


  public limpiar(){
    this.actual=new Usuario();
  }
}