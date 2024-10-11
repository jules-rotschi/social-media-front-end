import { Injectable } from "@angular/core";
import { AuthRepository } from "../../contracts/repositories/auth-repository.js";
import { LoginUserInputDTO } from "../../contracts/dto/user/login-user-input-dto.js";
import { User } from "../../entities/user.js";

@Injectable({
  providedIn: 'root'
})
export class LoginUsecase {

  constructor(private authRepository: AuthRepository) {}

  handle(user: LoginUserInputDTO) {
    return this.authRepository.login(user.uid, user.password);
  }
}