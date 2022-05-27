export class Usuario {

  id: string;
  nombre: string;
  contra: string;
  email: string;
  carrera: string;
  edad: number;
  semestre: number;
  rol: string;

  constructor() {

  }

  crear(id: string, nombre: string, contra: string, email: string, carrera: string, edad: number, semestre: number) {
    this.id = id;
    this.nombre = nombre;
    this.contra = contra;
    this.email = email;
    this.carrera = carrera;
    this.edad = edad;
    this.semestre = semestre;
  }


}
