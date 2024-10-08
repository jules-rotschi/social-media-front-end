import { Component, OnDestroy, signal } from '@angular/core';
import { SignupUsecase } from '../../../domain/usecases/auth/signup-usecase';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from './signup-contract';
import { InputComponent } from '../../components/input/input.component';
import { StorageRepository } from '../../../domain/contracts/repositories/storage-repository';
import { HttpError } from '../../errors/http-error';
import { Subscription } from 'rxjs';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'sm-signup',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {

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

  subscription?: Subscription;
  httpErrors = signal<HttpError[]>([]);

  constructor(
    private signupUsecase: SignupUsecase,
    private storageRepository: StorageRepository
  ) {}

  onSubmit() {
    const data = this.signupForm.getRawValue();
    this.subscription = this.signupUsecase.handle(data).subscribe(
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
      this.usernameError.set('Le nom d\'utilisateur ne doit contenir que des lettres minuscules, des chiffres, et ces trois caractères spéciaux : ., _, -');
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}