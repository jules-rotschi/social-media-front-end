import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from '../pages/signup/signup-contract';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SignupUserInputDTO } from '../../../domain/contracts/dto/user/signup-user-input-dto';

@Component({
  selector: 'sm-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  signupForm = new FormGroup<SignupForm>({
    username: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-z0-9_.\-]*$')
        ]
      }
    ),
    email: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }
    ),
    fullName: new FormControl(
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
          Validators.minLength(12)
        ]
      }
    ),
    passwordConfirmation: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }
    )
  });

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get fullName() {
    return this.signupForm.get('fullName');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirmation() {
    return this.signupForm.get('passwordConfirmation');
  }

  usernameError = signal('');
  emailError = signal('');
  fullNameError = signal('');
  passwordError = signal('');
  passwordConfirmationError = signal('');

  onInputChange() {   
    if (this.username?.invalid && this.username?.dirty && this.username?.touched && this.username?.hasError('required')) {
      this.usernameError.set('Vous devez entrer un nom d\'utilisateur');
    } else if (this.username?.invalid && this.username?.dirty && this.username?.touched && this.username?.hasError('minlength')) {
      this.usernameError.set('Votre nom d\'utilisateur doit contenir au moins 2 caractères');
    } else if (this.username?.invalid && this.username?.dirty && this.username?.touched && this.username?.hasError('pattern')) {
      this.usernameError.set('Ce nom d\'utilisateur contient un caractère non-authorisé');
    } else {
      this.usernameError.set('');
    }

    if (this.email?.invalid && this.email?.dirty && this.email?.touched && this.email?.hasError('email')) {
      this.emailError.set('L\'e-mail est invalide.');
    } else if (this.email?.invalid && this.email?.dirty && this.email?.touched && this.email?.hasError('required')) {
      this.emailError.set('Vous devez entrer un e-mail.');
    } else {
      this.emailError.set('');
    }

    if (this.fullName?.invalid && this.fullName?.dirty && this.fullName?.touched && this.fullName?.hasError('required')) {
      this.fullNameError.set('Vous devez entrer un nom.');
    } else {
      this.fullNameError.set('');
    }

    if (this.password?.invalid && this.password?.dirty && this.password?.touched && this.password?.hasError('required')) {
      this.passwordError.set('Vous devez entrer un mot de passe.');
    } else if (this.password?.invalid && this.password?.dirty && this.password?.touched && this.password?.hasError('minlength')) {
      this.passwordError.set('Votre mot de passe doit contenir au moins 12 caractères.');
    } else {
      this.passwordError.set('');
    }

    if (this.passwordConfirmation?.invalid && this.passwordConfirmation?.dirty && this.passwordConfirmation?.touched && this.passwordConfirmation?.hasError('required')) {
      this.passwordConfirmationError.set('Vous devez confirmer votre mot de passe.');
    } else if (this.passwordConfirmation?.dirty && this.passwordConfirmation?.touched && this.passwordConfirmation?.value !== this.password?.value) {
      this.passwordConfirmationError.set('Les mots de passe ne correspondent pas');
    } else {
      this.passwordConfirmationError.set('');
    }
  }

  @Input() signup(data: SignupUserInputDTO): void {};

  onSubmit() {
    const data = this.signupForm.getRawValue();
    this.signup(data);
  }
}
