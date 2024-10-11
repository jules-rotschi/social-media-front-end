import { Component, OnDestroy, signal } from '@angular/core';
import { SignupUsecase } from '../../../../domain/usecases/auth/signup-usecase';
import { ClientSideStorageRepository } from '../../../../domain/contracts/repositories/client-side-storage-repository';
import { HttpError } from '../../../errors/http-error';
import { Subscription } from 'rxjs';
import { ButtonComponent } from "../../../components/button/button.component";
import { SignupUserInputDTO } from '../../../../domain/contracts/dto/user/signup-user-input-dto';
import { SignupFormComponent } from '../../signup-form/signup-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'sm-signup',
  standalone: true,
  imports: [ButtonComponent, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {

  subscription?: Subscription;
  httpErrors = signal<HttpError[]>([]);

  constructor(
    private signupUsecase: SignupUsecase,
    private clientSideStorageRepository: ClientSideStorageRepository,
    private router: Router
  ) {}

  signup(data: SignupUserInputDTO) {
    this.subscription = this.signupUsecase.handle(data).subscribe(
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