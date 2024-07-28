import { FormControl } from "@angular/forms";
import { SignupUserInputDTO } from "../../../domain/contracts/dto/user/signup-user-input-dto";

export interface SignupForm {
  username: FormControl<SignupUserInputDTO["username"]>;
  email: FormControl<SignupUserInputDTO["email"]>;
  fullName: FormControl<SignupUserInputDTO["fullName"]>;
  password: FormControl<SignupUserInputDTO["password"]>;
  passwordConfirmation: FormControl<SignupUserInputDTO["passwordConfirmation"]>;
}