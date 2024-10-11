import { Component } from '@angular/core';
import { AuthRepository } from '../domain/contracts/repositories/auth-repository';
import { HttpAuthRepository } from './repositories/auth/http-auth-repository';
import { SignupUsecase } from '../domain/usecases/auth/signup-usecase';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { RouterOutlet } from '@angular/router';
import { ClientSideStorageRepository } from '../domain/contracts/repositories/client-side-storage-repository';
import { LocalStorageRepository } from './repositories/client-side-storage/local-storage-repository';
import { LoginUsecase } from '../domain/usecases/auth/login-usecase';
import { ForgottenPasswordUsecase } from '../domain/usecases/auth/forgotten-password-usecase';

@Component({
  selector: 'social-media',
  standalone: true,
  imports: [SignupComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    SignupUsecase,
    LoginUsecase,
    ForgottenPasswordUsecase,
    {
      provide: AuthRepository,
      useClass: HttpAuthRepository
    },
    {
      provide: ClientSideStorageRepository,
      useClass: LocalStorageRepository
    }
  ]
})
export class AppComponent {}
