export abstract class ClientSideStorageRepository {
  abstract storeToken(token: string): void;
  abstract storeAnonymousMode(anonymous: boolean): void;
  abstract getToken(): string | null;
  abstract getAnonymousMode(): boolean;
}