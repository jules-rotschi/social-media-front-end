import { Injectable } from "@angular/core";
import { AuthRepository } from "../../contracts/repositories/auth-repository.js";
import { ForgottenPasswordInputDTO } from "../../contracts/dto/user/forgotten-password-input-dto.js";

@Injectable({
  providedIn: 'root'
})
export class ForgottenPasswordUsecase {

  constructor(private authRepository: AuthRepository) {}

  handle(user: ForgottenPasswordInputDTO) {
    return this.authRepository.sendResetPasswordEmail(user.email);
  }
}