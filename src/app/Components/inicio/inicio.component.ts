import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Profesor} from 'src/app/Models/Profesor';
import {ProfesorService} from 'src/app/Services/Profesor.service';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    public _profesoresService: ProfesorService,
    public authService: AuthService
  ) {
  }

  public profe: Profesor = new Profesor();

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const role = localStorage.getItem('role');
      if (role === 'Profesor')
        this.router.navigate(['/teacher-home']);
      else
        this.router.navigate(['/student-home']);
    }
  }

  iniciar() {
    this.router.navigate(['/iniciar']);
  }
}
