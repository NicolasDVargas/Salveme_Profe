import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from 'src/app/Services/Profesor.service';
import {Profesor} from "../../Models/Profesor";

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacher: Profesor;
  teacherId: string = '';
  enabledCreateClass: boolean = false;
  userId: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private teacherService: ProfesorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const localUser = localStorage.getItem('user');
    // @ts-ignore
    const user = JSON.parse(localUser);
    this.userId = user.id;
    this.teacherId = this.route.snapshot.params['id'];
    this.teacherService.getAllTeachers().subscribe({
      next: res => {
        let teachers: Array<any> = [];
        const keys = Object.keys(res);
        for (let key of keys) {
          const user = res[key];
          teachers.push(user);
        }
        this.teacher = teachers.find(t => t.id === this.teacherId);
      }
    });
  }

  public onClose(): void {
    this.enabledCreateClass = false;
  }

  public onOpen(): void {
    this.enabledCreateClass = true;
  }

}
