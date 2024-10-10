import { Observable } from "rxjs";
import { AuthRepository } from "../../../domain/contracts/repositories/auth-repository";
import { User } from "../../../domain/entities/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginUserInputDTO } from "../../../domain/contracts/dto/user/login-user-input-dto";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthRepository implements AuthRepository {

  API = "http://localhost:3333"

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(
      `${this.API}/signup`,
      { data: user }
    );
  }

  login(user: LoginUserInputDTO): Observable<any> {
    return this.http.post(
      `${this.API}/login`,
      { data: user }
    );
  }
}