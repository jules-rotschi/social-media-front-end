import { Injectable } from "@angular/core";
import { ClientSideStorageRepository } from "../../../domain/contracts/repositories/client-side-storage-repository";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepository implements ClientSideStorageRepository {
  storeToken(token: string): void {
    localStorage.setItem('token', token)
  }
  
  storeAnonymousMode(anonymous: boolean): void {
    localStorage.setItem('anonymous', anonymous.toString())
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAnonymousMode(): boolean {
    const anonymousModeStorage = localStorage.getItem('anonymous');
    if (!anonymousModeStorage) return false;
    const anonymousMode = anonymousModeStorage === 'true' ? true : false;
    return anonymousMode
  }
}