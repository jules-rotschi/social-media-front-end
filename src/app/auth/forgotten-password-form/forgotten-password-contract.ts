import { FormControl } from "@angular/forms";
import { ForgottenPasswordInputDTO } from "../../../domain/contracts/dto/user/forgotten-password-input-dto";

export interface ForgottenPasswordForm {
  email: FormControl<ForgottenPasswordInputDTO["email"]>;
}