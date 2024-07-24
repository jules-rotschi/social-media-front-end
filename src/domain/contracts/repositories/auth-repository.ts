import { Observable } from "rxjs";
import { User, UserUID } from "../../entities/user";
import { SignupDto } from "../dto/create-user-dto";

export abstract class AuthRepository {
  abstract signup(user: SignupDto): Observable<any>;
  abstract login(uid: UserUID, password: User["password"]): Promise<string>;
}