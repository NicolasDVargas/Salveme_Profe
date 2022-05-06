import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Profesor } from '../Models/Profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  public profesores: Profesor[] = [];
  public profeActual: Profesor;
  public id:number = 0;

  constructor() { }

  public agregar(nombre: string, contra:string,Materias:string,email:string){
    this.profeActual=new Profesor();
    this.profeActual.crear(this.id,nombre,contra,Materias,email);
    this.profesores.push(this.profeActual);
    this.id++;
    this.profeActual=new Profesor;
  }

  public obtener(){
    return this.profesores;
  }

  public limpiar(){
    this.profeActual=new Profesor();
  }
}
