import { Component, OnChanges, OnDestroy, signal, SimpleChanges } from '@angular/core';
import { SignupUsecase } from '../../../domain/usecases/auth/signup-usecase';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class SignupComponent implements OnChanges, OnDestroy {

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

  validationErrors = {
    email: '',
    username: '',
    fullName: '',
    password: '',
    passwordConfirmation: '',
  };

  get email() {
    return this.signupForm.get('email');
  }

  subscription?: Subscription;
  errors = signal<HttpError[]>([]);

  constructor(
    private signupUsecase: SignupUsecase,
    private storageRepository: StorageRepository
  ) {}

  onSubmit() {
    const data = this.signupForm.getRawValue();
    this.subscription = this.signupUsecase.handle(data).subscribe(
      {
        next: (response) => {
          this.errors.set([]);
          this.storageRepository.storeToken(response.data.token);
        },
        error: ({ error }) => {
          this.errors.set(error.errors);
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.email?.invalid && this.email?.dirty && this.email?.touched && this.email?.hasError('required')) {
      this.validationErrors.email = 'Vous devez entrer un e-mail.'
    }
    if (this.email?.invalid && this.email?.dirty && this.email?.touched && this.email?.hasError('email')) {
        this.validationErrors.email = 'L\'e-mail est invalide.'
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}