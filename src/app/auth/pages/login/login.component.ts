import { Component, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../components/button/button.component';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { HttpError } from '../../../errors/http-error';
import { LoginUsecase } from '../../../../domain/usecases/auth/login-usecase';
import { ClientSideStorageRepository } from '../../../../domain/contracts/repositories/client-side-storage-repository';
import { LoginUserInputDTO } from '../../../../domain/contracts/dto/user/login-user-input-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'sm-login',
  standalone: true,
  imports: [ButtonComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  subscription?: Subscription;
  httpErrors = signal<HttpError[]>([]);

  constructor(
    private loginUsecase: LoginUsecase,
    private clientSideStorageRepository: ClientSideStorageRepository,
    private router: Router
  ) {}

  login(data: LoginUserInputDTO) {
    this.subscription = this.loginUsecase.handle(data).subscribe(
      {
        next: (response) => {
          this.httpErrors.set([]);
          this.clientSideStorageRepository.storeToken(response.data.token);
          this.clientSideStorageRepository.storeAnonymousMode(false);
          this.router.navigateByUrl('/');
        },
        error: ({ error }) => {
          this.httpErrors.set(error.errors);
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
