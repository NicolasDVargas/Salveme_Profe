import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClassService} from "../../Services/class.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-class-modal',
  templateUrl: './create-class-modal.component.html',
  styleUrls: ['./create-class-modal.component.css']
})
export class CreateClassModalComponent implements OnInit {

  @Input() userId: string;
  @Input() teacherId: string;
  @Output() closeAlert = new EventEmitter<void>();

  startDate: Date;
  endDate: Date;

  currentClasses: Array<any> = [];

  constructor(
    private classService: ClassService
  ) {
  }

  ngOnInit(): void {
    this.classService.getClasses().subscribe({
      next: res => {
        const keys = Object.keys(res);
        for (let key of keys) {
          const clas = res[key];
          this.currentClasses.push(clas);
        }
      }
    });
  }

  onClose() {
    this.closeAlert.emit();
  }

  onCreateClass(): void {
    console.log(this.startDate)
    console.log(this.endDate)

    if (this.validateDates()) {
      this.classService.createClass(this.userId, this.teacherId, this.startDate, this.endDate).subscribe({
        next: res => {
          this.onClose();
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error creando la clase',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fechas invalidas',
      })
    }
  }

  validateDates(): boolean {
    if (this.startDate === null || this.startDate === undefined || this.endDate === null || this.endDate === undefined) {
      return false;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate)

    const now = new Date();

    if (start > end || start < now || end < now) {
      return false;
    }

    if (this.currentClasses.length !== 0) {
      for (const clas of this.currentClasses) {
        const classStart = new Date(clas.startDate);
        const classEnd = new Date(clas.endDate);
        if ((start > classStart && start < classEnd) ||
          (end >= classStart && end <= classEnd) ||
          (start < classStart && end > classEnd)) {
          return false;
        }
      }
    }
    return true;
  }

}
