import { Component } from '@angular/core';
import { AuthRepository } from '../../domain/contracts/repositories/auth-repository';
import { HttpAuthRepository } from '../repositories/auth/http-auth-repository';
import { SignupUsecase } from '../../domain/usecases/auth/signup-usecase';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignupFormComponent],
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
export class AppComponent {}
