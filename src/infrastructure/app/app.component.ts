import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRepository } from '../../domain/contracts/repositories/user-repository';
import { HttpUserRepository } from '../repositories/user/http-user-repository';
import { AuthRepository } from '../../domain/contracts/repositories/auth-repository';
import { HttpAuthRepository } from '../repositories/auth/http-auth-repository';
import { SignupUsecase } from '../../domain/usecases/auth/signup-usecase';
import { SignupDto } from '../../domain/contracts/dto/create-user-dto';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    SignupUsecase,
    {
      provide: AuthRepository,
      useClass: HttpAuthRepository
    }
  ]
})
export class AppComponent {

  constructor(private signupUsecase: SignupUsecase) {}

  user: SignupDto = {
    username: "jules_air",
    email: "jules2air@gmail.com",
    fullName: "Jules Air",
    password: "password",
    passwordConfirmation: "password"
  }
  token?: string;

  onSubmit() {
    console.log('submit');
    
    this.signupUsecase.handle(this.user).subscribe((response) => {
      console.log(response);
      if (response.body) {
        this.token = response.body.token;
      }
    })    
  }
}
