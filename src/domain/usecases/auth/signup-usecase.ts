import { Injectable } from "@angular/core";
import { SignupDto } from "../../contracts/dto/create-user-dto.js";
import { AuthRepository } from "../../contracts/repositories/auth-repository.js";

@Injectable({
  providedIn: 'root'
})
export class SignupUsecase {

  constructor(private authRepository: AuthRepository) {}

  handle(user: SignupDto) {
    return this.authRepository.signup(user);
  }
}