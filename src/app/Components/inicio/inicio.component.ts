import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/Models/Profesor';
import { ProfesorService } from 'src/app/Services/Profesor.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router, public _profesoresService:ProfesorService) { }
  public profe: Profesor =new Profesor();

  ngOnInit(): void {}

  iniciar(){
    this.router.navigateByUrl('./iniciar');
  }
}
