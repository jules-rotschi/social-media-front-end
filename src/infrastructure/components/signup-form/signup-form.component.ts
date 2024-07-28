import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SignupUsecase } from '../../../domain/usecases/auth/signup-usecase';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from './signup-form-contract';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  signupForm = new FormGroup<SignupForm>({
    username: new FormControl(
      'marc',
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
      'marc@example.com',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }
    ),
    fullName: new FormControl(
      'Marc',
      {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }
    ),
    password: new FormControl(
      'This is my password',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(12)
        ]
      }
    ),
    passwordConfirmation: new FormControl(
      'This is my password',
      {
        nonNullable: true,
        validators: [
          Validators.required
        ]
      }
    )
  });

  data?: any;
  errors?: any;

  constructor(
    private signupUsecase: SignupUsecase
  ) {}

  onSubmit() {
    const data = this.signupForm.getRawValue();
    this.signupUsecase.handle(data).subscribe(
      {
        next: (response) => {
          console.log("Réponse HTTP", response);
          this.data = response.data;
        },
        error: (error) => {
          console.log("Erreur HTTP", error);
          this.errors = error.errors;
        }
      }
    )
  }
}
