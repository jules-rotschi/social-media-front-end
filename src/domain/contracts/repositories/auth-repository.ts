import { Observable } from "rxjs";
import { User, UserUID } from "../../entities/user";

export abstract class AuthRepository {
  abstract signup(user: User): Observable<any>;
}