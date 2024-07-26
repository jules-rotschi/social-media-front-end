import { Injectable } from "@angular/core";
import { SignupUserDto } from "../../contracts/dto/user/signup-user-dto.js";
import { AuthRepository } from "../../contracts/repositories/auth-repository.js";

@Injectable({
  providedIn: 'root'
})
export class SignupUsecase {

  constructor(private authRepository: AuthRepository) {}

  handle(user: SignupUserDto) {
    return this.authRepository.signup(user);
  }
}