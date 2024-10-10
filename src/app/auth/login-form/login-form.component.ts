import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  onInputChange() {   
    if (this.uid?.invalid && this.uid?.dirty && this.uid?.touched && this.uid?.hasError('required')) {
      this.uidError.set('Vous devez entrer votre nom d\'utilisateur ou e-mail');
    } else {
      this.uidError.set('');
    }

    if (this.password?.invalid && this.password?.dirty && this.password?.touched && this.password?.hasError('required')) {
      this.passwordError.set('Vous devez entrer votre mot de passe');
    } else {
      this.passwordError.set('');
    }
  }

  @Input() login(data: LoginUserInputDTO): void {};

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();
      this.login(data);
    }
  }
}
