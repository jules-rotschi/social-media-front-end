export abstract class StorageRepository {
  abstract storeToken(token: string): void;
}