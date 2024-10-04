import { Observable } from "rxjs";
import { User } from "../../entities/user";

export abstract class AuthRepository {
  abstract signup(user: User): Observable<any>;
}