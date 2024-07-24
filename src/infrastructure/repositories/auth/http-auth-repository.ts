import { Observable } from "rxjs";
import { SignupDto } from "../../../domain/contracts/dto/create-user-dto";
import { AuthRepository } from "../../../domain/contracts/repositories/auth-repository";
import { UserUID, User } from "../../../domain/entities/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthRepository implements AuthRepository {

  constructor(private http: HttpClient) {}

  apiRootUrl: string = "http://localhost:3333"

  signup(user: SignupDto): Observable<any> {
    return this.http.post(
      `${this.apiRootUrl}/signup`,
      { user },
      { reportProgress: true,  observe: 'events' }
    );
  }

  login(uid: UserUID, password: User["password"]): Promise<string> {
    throw new Error("Method not implemented.");
  }
  
}