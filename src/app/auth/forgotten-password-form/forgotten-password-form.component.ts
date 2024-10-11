import { Component, Input, signal } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgottenPasswordForm } from './forgotten-password-contract';
import { ButtonComponent } from '../../components/button/button.component';
import { ForgottenPasswordInputDTO } from '../../../domain/contracts/dto/user/forgotten-password-input-dto';

@Component({
  selector: 'sm-forgotten-password-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './forgotten-password-form.component.html',
  styleUrl: './forgotten-password-form.component.scss'
})
export class ForgottenPasswordFormComponent {

  forgottenPasswordForm = new FormGroup<ForgottenPasswordForm>({
    email: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }
    )
  });

  get email() {
    return this.forgottenPasswordForm.get('email');
  }

  emailError = signal('');

  hasUserTriedToSubmit = false;

  hasBeenUserAction(control: AbstractControl<string, string> | null) {
    return ((control?.dirty && control?.touched) || this.hasUserTriedToSubmit);
  }

  isInvalidAndActioned(control: AbstractControl<string, string> | null) {
    return control?.invalid && this.hasBeenUserAction(control);
  }

  setEmailError() {
    if (this.isInvalidAndActioned(this.email)) {
      if (this.email?.hasError('required')) {
        this.emailError.set('Vous devez entrer un e-mail');
      }
      if (this.email?.hasError('email')) {
        this.emailError.set('L\'e-mail est invalide');
      }
    } else {
      this.emailError.set('');
    }
  }

  onInputChange() {
    this.setEmailError();
  }

  @Input() sendResetPasswordEmail(data: ForgottenPasswordInputDTO): void {};

  onSubmit() {
    if (this.forgottenPasswordForm.valid) {
      const data = this.forgottenPasswordForm.getRawValue();
      this.sendResetPasswordEmail(data);
    }
    this.hasUserTriedToSubmit = true;
    this.onInputChange();
  }

}
