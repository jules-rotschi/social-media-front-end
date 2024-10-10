import { Component, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../components/button/button.component';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { HttpError } from '../../../errors/http-error';
import { LoginUsecase } from '../../../../domain/usecases/auth/login-usecase';
import { StorageRepository } from '../../../../domain/contracts/repositories/storage-repository';
import { LoginUserInputDTO } from '../../../../domain/contracts/dto/user/login-user-input-dto';

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
    private loginUseCase: LoginUsecase,
    private storageRepository: StorageRepository
  ) {}

  login(data: LoginUserInputDTO) {
    this.subscription = this.loginUseCase.handle(data).subscribe(
      {
        next: (response) => {
          this.httpErrors.set([]);
          this.storageRepository.storeToken(response.data.token);
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
