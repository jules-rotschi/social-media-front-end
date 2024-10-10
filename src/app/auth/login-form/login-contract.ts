import { FormControl } from "@angular/forms";
import { LoginUserInputDTO } from "../../../domain/contracts/dto/user/login-user-input-dto";

export interface LoginForm {
  uid: FormControl<LoginUserInputDTO["uid"]>;
  password: FormControl<LoginUserInputDTO["password"]>;
}