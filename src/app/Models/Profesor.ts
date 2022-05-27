export class Profesor {

  id: string;
  nombre: string;
  contra: string;
  email: string;
  materias: Array<string>;
  puntaje: number;
  numeroDeReviews: number;
  rol: string;

  constructor() {

  }

  crear(id: number, nombre: string, contra: string, materias: Array<string>, email: string) {
    this.nombre = nombre;
    this.contra = contra;
  }
}
