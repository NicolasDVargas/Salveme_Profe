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

  public agregar(usu : Usuario){
    this.vertedero.push(usu)
  }

  public obtener(){
    return this.vertedero;
  }


  public limpiar(){
    this.actual=new Usuario();
  }
}