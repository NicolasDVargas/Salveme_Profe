export class Profesor{

    id:number;
    nombre: string;
    contra: string;
    email: string;
    Materias: string;
    puntaje: number;
    numeroDeReviews:number;

    constructor (){
       
    }

    crear (id:number,nombre:string,contra:string,materias:string,email:string){
        this.nombre=nombre;
        this.contra=contra;
    }
}