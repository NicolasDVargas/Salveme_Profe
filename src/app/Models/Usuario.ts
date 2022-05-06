import * as internal from "stream";

export class Usuario{

    id:number;
    nombre: string;
    contra: string;
    email: string;
    carrera: string;
    edad:number;
    semestre:number;

    constructor(){
    
    }

    crear (id:number, nombre: string,contra: string,email: string, carrera: string, edad:number, semestre:number){
       this.id=id;
       this.nombre=nombre;
       this.contra=contra;
       this.email=email;
       this.carrera=carrera;
       this.edad=edad;
       this.semestre=semestre;
    }




}