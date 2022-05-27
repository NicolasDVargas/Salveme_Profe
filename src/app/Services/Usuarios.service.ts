import {Injectable} from '@angular/core';
import {Usuario} from '../Models/Usuario';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiKey = environment.firebaseApiKey;
  private dbUrl = environment.dbUrl;
  public vertedero: Usuario[] = [];
  public actual: Usuario;
  public id: string = '0';

  constructor(
    private http: HttpClient
  ) {
  }

  public usuario: Usuario;

  public agregar(nombre: string, contra: string, email: string, carrera: string, edad: number, semestre: number) {
    this.usuario.crear(this.id, nombre, contra, email, carrera, edad, semestre);
    this.vertedero.push(this.usuario);
  }

  public obtener() {
    return this.vertedero;
  }


  public limpiar() {
    this.actual = new Usuario();
  }

  public createUser(user: Usuario): Observable<any> {
    const body = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      carrera: user.carrera,
      edad: user.edad,
      semestre: user.semestre,
      rol: 'Estudiante'
    }
    return this.http.post(`${this.dbUrl}/students.json`, body);
  }

  public getUser(email: String): Observable<any> {
    return this.http.get(`${this.dbUrl}/students.json?orderBy="email"&equalTo="${email}"`);
  }

  public getAllUser(): Observable<any> {
    return this.http.get(`${this.dbUrl}/students.json`);
  }
}
