import { Observable } from "rxjs";
import { SignupUserDto } from "../../../domain/contracts/dto/user/signup-user-dto";
import { AuthRepository } from "../../../domain/contracts/repositories/auth-repository";
import { UserUID, User } from "../../../domain/entities/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthRepository implements AuthRepository {

  API = "http://localhost:3333"

  constructor(private http: HttpClient) {}

  signup(user: SignupUserDto): Observable<any> {
    return this.http.post(
      `${this.API}/signup`,
      { data: user },
      { reportProgress: true,  observe: 'events' }
    );
  }

  login(uid: UserUID, password: User["password"]): Promise<string> {
    throw new Error("Method not implemented.");
  }
}