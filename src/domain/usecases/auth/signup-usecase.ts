import { Injectable } from "@angular/core";
import { SignupUserInputDTO } from "../../contracts/dto/user/signup-user-input-dto.js";
import { AuthRepository } from "../../contracts/repositories/auth-repository.js";
import { User } from "../../entities/user.js";

@Injectable({
  providedIn: 'root'
})
export class SignupUsecase {

  constructor(private authRepository: AuthRepository) {}

  handle(user: SignupUserInputDTO) {
    const userToSignup = new User(
      user.username,
      user.email,
      user.fullName,
      user.password
    )
    userToSignup.passwordConfirmation = user.passwordConfirmation;
    return this.authRepository.signup(userToSignup);
  }
}