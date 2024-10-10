import { Component, Input, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from './signup-contract';
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

  hasUserTriedToSignup = false;

  hasBeenUserAction(control: AbstractControl<string, string> | null) {
    return ((control?.dirty && control?.touched) || this.hasUserTriedToSignup);
  }

  isInvalidAndActioned(control: AbstractControl<string, string> | null) {
    return control?.invalid && this.hasBeenUserAction(control);
  }

  arePasswordsEqual() {
    return this.passwordConfirmation?.value === this.password?.value
  }

  setUsernameError() {
    if (this.isInvalidAndActioned(this.username)) {
      if (this.username?.hasError('pattern')) {
        this.usernameError.set('Ce nom d\'utilisateur contient un caractère non-autorisé');
      }
      if (this.username?.hasError('minlength')) {
        this.usernameError.set('Votre nom d\'utilisateur doit contenir au moins 2 caractères');
      }
      if (this.username?.hasError('required')) {
        this.usernameError.set('Vous devez entrer un nom d\'utilisateur');
      }
    } else {
      this.usernameError.set('');
    }
  }

  setEmailError() {
    if (this.isInvalidAndActioned(this.email)) {
      if (this.email?.hasError('email')) {
        this.emailError.set('L\'e-mail est invalide.');
      }
      if (this.email?.hasError('required')) {
        this.emailError.set('Vous devez entrer un e-mail.');
      }
    } else {
      this.emailError.set('');
    }
  }

  setFullNameError() {
    if (this.isInvalidAndActioned(this.fullName)) {
      if (this.fullName?.hasError('required')) {
        this.fullNameError.set('Vous devez entrer un nom.');
      }
    } else {
      this.fullNameError.set('');
    }
  }

  setPasswordError() {
    if (this.isInvalidAndActioned(this.password)) {
      if (this.password?.hasError('minlength')) {
        this.passwordError.set('Votre mot de passe doit contenir au moins 12 caractères.');
      }
      if (this.password?.hasError('required')) {
        this.passwordError.set('Vous devez entrer un mot de passe.');
      }
    } else {
      this.passwordError.set('');
    }
  }

  setPasswordConfirmationError() {
    if (this.isInvalidAndActioned(this.passwordConfirmation)) {
      if (this.passwordConfirmation?.hasError('required')) {
        this.passwordConfirmationError.set('Vous devez confirmer votre mot de passe.');
      }
    } else if (this.hasBeenUserAction(this.passwordConfirmation) && !this.arePasswordsEqual()) {
      this.passwordConfirmationError.set('Les mots de passe ne correspondent pas');
    } else {
      this.passwordConfirmationError.set('');
    }
  }

  onInputChange() {
    this.setUsernameError();
    this.setEmailError();
    this.setFullNameError();
    this.setPasswordError();
    this.setPasswordConfirmationError();
  }

  @Input() signup(data: SignupUserInputDTO): void {};

  onSubmit() {
    if (this.signupForm.valid && this.arePasswordsEqual()) {
      const data = this.signupForm.getRawValue();
      this.signup(data);
    }
    this.hasUserTriedToSignup = true;
    this.onInputChange();
  }
}