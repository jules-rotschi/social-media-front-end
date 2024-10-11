import { Routes } from '@angular/router';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AnonymousConnexionComponent } from './auth/pages/anonymous-connexion/anonymous-connexion.component';
import { ForgottenPasswordComponent } from './auth/pages/forgotten-password/forgotten-password.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ResetPasswordEmailSentComponent } from './auth/pages/reset-password-email-sent/reset-password-email-sent.component';

export const routes: Routes = [
  {
    path: 'inscription',
    component: SignupComponent,
    title: 'Social Media | Inscription'
  },
  {
    path: 'connexion',
    component: LoginComponent,
    title: 'Social Media | Connexion'
  },
  {
    path: 'connexion-anonyme',
    component: AnonymousConnexionComponent,
    title: 'Social Media | Connexion anonyme'
  },
  {
    path: 'mot-de-passe-oublie',
    component: ForgottenPasswordComponent,
    title: 'Social Media | Mot de passe oublié'
  },
  {
    path: 'mot-de-passe-oublie/e-mail-envoye',
    component: ResetPasswordEmailSentComponent,
    title: 'Social Media | E-mail envoyé'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Social Media | Page introuvable'
  },
];
