import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { ClientSideStorageRepository } from '../../../../domain/contracts/repositories/client-side-storage-repository';
import { Router } from '@angular/router';

@Component({
  selector: 'sm-anonymous-connexion',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './anonymous-connexion.component.html',
  styleUrl: './anonymous-connexion.component.scss'
})
export class AnonymousConnexionComponent {

  constructor(
    private clientSideStorageRepository: ClientSideStorageRepository,
    private router: Router
  ) {}

  connectAsAnonymous() {
    this.clientSideStorageRepository.storeAnonymousMode(true);
    this.router.navigateByUrl('/');
  }
}
