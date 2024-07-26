import { Observable } from "rxjs";
import { User, UserUID } from "../../entities/user";
import { SignupUserDto } from "../dto/user/signup-user-dto";

export abstract class AuthRepository {
  abstract signup(user: SignupUserDto): Observable<any>;
  abstract login(uid: UserUID, password: User["password"]): Promise<string>;
}