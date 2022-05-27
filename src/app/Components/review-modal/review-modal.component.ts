import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profesor} from "../../Models/Profesor";
import {ProfesorService} from "../../Services/Profesor.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {

  @Input() teacher: Profesor;
  @Output() closeAlert = new EventEmitter<void>();

  key: string = '';

  qualifications: Array<number> = [1, 2, 3, 4, 5];
  value: number = 1;

  constructor(
    private teacherService: ProfesorService
  ) {
  }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: res => {
        const keys = Object.keys(res);
        for (let key of keys) {
          const user = res[key];
          if (user.id === this.teacher.id) {
            this.key = key;
            break;
          }
        }
      }
    });
  }

  onUpdateTeacher() {
    const accumulated = +this.teacher.puntaje * this.teacher.numeroDeReviews;
    this.teacher.numeroDeReviews += 1;
    this.teacher.puntaje = (accumulated + +this.value) / this.teacher.numeroDeReviews;
    this.teacherService.updateTeacher(this.key, this.teacher).subscribe({
      next: res => {
        console.log(res);
        this.onClose();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error actualizando el puntaje',
        });
      }
    });
  }

  onClose() {
    this.closeAlert.emit();
  }

}
