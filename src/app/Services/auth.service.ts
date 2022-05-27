import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private registerBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private apiKey = environment.firebaseApiKey;

  constructor(
    private http: HttpClient
  ) {
  }

  public login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    };
    return this.http.post(`${this.loginBaseUrl}${this.apiKey}`, body);
  }

  public register(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    };
    return this.http.post(`${this.registerBaseUrl}${this.apiKey}`, body);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
