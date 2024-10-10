import { Routes } from '@angular/router';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'inscription',
    component: SignupComponent
  },
  {
    path: 'connexion',
    component: LoginComponent
  },
  // {
  //   path: 'connexion-anonyme',
  // }
];
