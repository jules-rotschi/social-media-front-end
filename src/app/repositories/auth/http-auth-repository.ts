import { Observable } from "rxjs";
import { AuthRepository } from "../../../domain/contracts/repositories/auth-repository";
import { User, UserUID } from "../../../domain/entities/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthRepository implements AuthRepository {

  API = "http://localhost:3333";

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(
      `${this.API}/signup`,
      { data: user }
    );
  }

  login(uid: UserUID, password: User['password']): Observable<any> {
    return this.http.post(
      `${this.API}/login`,
      { data: { uid, password } }
    );
  }

  sendResetPasswordEmail(email: User['email']): Observable<any> {
    return this.http.post(
      `${this.API}/forgotten-password`,
      { data: { email } }
    )
  }
}