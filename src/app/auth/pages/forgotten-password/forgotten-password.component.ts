import { Component, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpError } from '../../../errors/http-error';
import { ForgottenPasswordUsecase } from '../../../../domain/usecases/auth/forgotten-password-usecase';
import { Router } from '@angular/router';
import { ForgottenPasswordInputDTO } from '../../../../domain/contracts/dto/user/forgotten-password-input-dto';
import { ForgottenPasswordFormComponent } from '../../forgotten-password-form/forgotten-password-form.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [ButtonComponent, ForgottenPasswordFormComponent],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {
  subscription?: Subscription;
  httpErrors = signal<HttpError[]>([]);

  constructor(
    private forgottenPasswordUsecase: ForgottenPasswordUsecase,
    private router: Router
  ) {}

  sendResetPasswordEmail(data: ForgottenPasswordInputDTO) {
    this.subscription = this.forgottenPasswordUsecase.handle(data).subscribe(
      {
        next: (response) => {
          this.httpErrors.set([]);
          this.router.navigateByUrl('/mot-de-passe-oublie/e-mail-envoye');
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
