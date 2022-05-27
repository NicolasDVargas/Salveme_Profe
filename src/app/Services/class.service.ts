import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private dbUrl = environment.dbUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public createClass(userId: string, teacherId: string, startDate: Date, endDate: Date): Observable<any> {
    const body = {
      userId,
      teacherId,
      startDate,
      endDate
    }
    return this.http.post(`${this.dbUrl}/classes.json`, body);
  }

  public getClasses(): Observable<any> {
    return this.http.get(`${this.dbUrl}/classes.json`);
  }
}
