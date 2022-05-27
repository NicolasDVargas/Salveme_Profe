import {Component, OnInit} from '@angular/core';
import {ProfesorService} from "../../Services/Profesor.service";
import {Profesor} from "../../Models/Profesor";
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  enabledCreateClass: boolean = false;
  enabledReview: boolean = false;
  enabledProfile: boolean = false;
  teachers: Array<Profesor> = [];
  userId: string = '';
  teacherId: string = '';
  selectedTeacher: Profesor;

  constructor(
    private teacherService: ProfesorService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const localUser = localStorage.getItem('user');
    // @ts-ignore
    const user = JSON.parse(localUser);
    this.userId = user.id;
    this.teacherService.getAllTeachers().subscribe({
      next: res => {
        const keys = Object.keys(res);
        for (let key of keys) {
          const user = res[key];
          this.teachers.push(user);
        }
      }
    });
  }

  public onClose(): void {
    this.enabledCreateClass = false;
  }

  public onOpen(teacherId: string): void {
    this.teacherId = teacherId;
    this.enabledCreateClass = true;
  }

  public onCloseReview(): void {
    this.enabledReview = false;
    window.location.reload();
  }

  public onOpenReview(teacher: Profesor): void {
    this.selectedTeacher = teacher;
    this.enabledReview = true;
  }

  public onCloseProfile(): void {
    this.enabledProfile = false;
  }

  public onOpenProfile(teacher: Profesor): void {
    this.selectedTeacher = teacher;
    this.router.navigate(['/teacher-profile', teacher.id]);
  }

}
