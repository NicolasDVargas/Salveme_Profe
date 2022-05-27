import {Injectable} from '@angular/core';
import {NumberValueAccessor} from '@angular/forms';
import {Profesor} from '../Models/Profesor';
import {Usuario} from "../Models/Usuario";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private dbUrl = environment.dbUrl;
  public profesores: Profesor[] = [];
  public profeActual: Profesor;
  public id: number = 0;

  constructor(
    private http: HttpClient
  ) {
  }

  public agregar(nombre: string, contra: string, Materias: Array<string>, email: string) {
    this.profeActual = new Profesor();
    this.profeActual.crear(this.id, nombre, contra, Materias, email);
    this.profesores.push(this.profeActual);
    this.id++;
    this.profeActual = new Profesor;
  }

  public obtener() {
    return this.profesores;
  }

  public limpiar() {
    this.profeActual = new Profesor();
  }

  public createTeacher(user: Profesor): Observable<any> {
    const body = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      materias: user.materias,
      puntaje: 0,
      numeroDeReviews: 0,
      rol: 'Profesor'
    }
    return this.http.post(`${this.dbUrl}/teachers.json`, body);
  }

  public updateTeacher(key: string, user: Profesor): Observable<any> {
    const body = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      materias: [],
      puntaje: user.puntaje,
      numeroDeReviews: user.numeroDeReviews,
      rol: 'Profesor'
    }
    return this.http.put(`${this.dbUrl}/teachers/${key}.json`, body);
  }

  public getTeacher(email: String): Observable<any> {
    return this.http.get(`${this.dbUrl}/teachers.json?orderBy="email"&equalTo="${email}"`);
  }

  public getAllTeachers(): Observable<any> {
    return this.http.get(`${this.dbUrl}/teachers.json`);
  }
}
