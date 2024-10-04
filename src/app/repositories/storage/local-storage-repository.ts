import { Injectable } from "@angular/core";
import { StorageRepository } from "../../../domain/contracts/repositories/storage-repository";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepository implements StorageRepository {
  storeToken(token: string): void {
    localStorage.setItem('token', token)
  }
}