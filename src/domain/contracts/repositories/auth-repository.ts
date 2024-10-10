import { Observable } from "rxjs";
import { LoginUserInputDTO } from "../dto/user/login-user-input-dto";
import { User } from "../../entities/user";

export abstract class AuthRepository {
  abstract signup(user: User): Observable<any>;
  abstract login(user: LoginUserInputDTO): Observable<any>;
}