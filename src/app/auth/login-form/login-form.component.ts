import { Component, Input, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { LoginForm } from './login-contract';
import { LoginUserInputDTO } from '../../../domain/contracts/dto/user/login-user-input-dto';

@Component({
  selector: 'sm-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  loginForm = new FormGroup<LoginForm>({
    uid: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }
    ),
    password: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
        ]
      }
    )
  });

  get uid() {
    return this.loginForm.get('uid');
  }

  get password() {
    return this.loginForm.get('password');
  }

  uidError = signal('');
  passwordError = signal('');

  hasUserTriedToLogin = false;

  hasBeenUserAction(control: AbstractControl<string, string> | null) {
    return ((control?.dirty && control?.touched) || this.hasUserTriedToLogin);
  }

  isInvalidAndActioned(control: AbstractControl<string, string> | null) {
    return control?.invalid && this.hasBeenUserAction(control);
  }

  setUidError() {
    if (this.isInvalidAndActioned(this.uid) && this.uid?.hasError('required')) {
      this.uidError.set('Vous devez entrer votre nom d\'utilisateur ou e-mail');
    } else {
      this.uidError.set('');
    }
  }

  setPasswordError() {
    if (this.isInvalidAndActioned(this.password) && this.password?.hasError('required')) {
      this.passwordError.set('Vous devez entrer votre mot de passe');
    } else {
      this.passwordError.set('');
    }
  }

  onInputChange() {
    this.setUidError();
    this.setPasswordError();
  }

  @Input() login(data: LoginUserInputDTO): void {};

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();
      this.login(data);
    }
    this.hasUserTriedToLogin = true;
    this.onInputChange();
  }
}
