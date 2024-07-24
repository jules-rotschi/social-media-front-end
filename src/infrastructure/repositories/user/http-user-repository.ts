import { HttpClient } from "@angular/common/http";
import { SignupDto } from "../../../domain/contracts/dto/create-user-dto";
import { UserRepository } from "../../../domain/contracts/repositories/user-repository";
import { User } from "../../../domain/entities/user";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpUserRepository implements UserRepository {

  constructor(private http: HttpClient) {}

  apiRootUrl: string = "http://localhost:3333"

  create(user: SignupDto): Observable<any> {
    return this.http.post(
      `${this.apiRootUrl}/signup`,
      { user },
      { reportProgress: true,  observe: 'events' }
    );
  }

  getById(id: User["id"]): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getByEmail(email: User["email"]): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  getByUsername(username: User["username"]): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(userId: User["id"], updatedUser: Partial<User>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(userId: User["id"]): Promise<void> {
    throw new Error("Method not implemented.");
  }

}