export class Profesor{

    id:number;
    nombre: string;
    contra: string;
    email: string;
    Materias: String[]=[];
    puntaje: number;
    numeroDeReviews:number;

    constructor (){
       
    }

    crear (nombre:string,contra:string){
        this.nombre=nombre;
        this.contra=contra;
    }
}