import { Observable } from "rxjs";
import { User, UserUID } from "../../entities/user";

export abstract class AuthRepository {
  abstract signup(user: User): Observable<any>;
  abstract login(uid: UserUID, password: User['password']): Observable<any>;
  abstract sendResetPasswordEmail(email: User['email']): Observable<any>;
}