import { FormControl } from "@angular/forms";
import { SignupUserDto } from "../../../domain/contracts/dto/user/signup-user-dto";

export interface SignupForm {
  username: FormControl<SignupUserDto["username"]>;
  email: FormControl<SignupUserDto["email"]>;
  fullName: FormControl<SignupUserDto["fullName"]>;
  password: FormControl<SignupUserDto["password"]>;
  passwordConfirmation: FormControl<SignupUserDto["passwordConfirmation"]>;
}