import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable()
export class StorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public save(key: string, value: string): void {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, value);
  }
  public get(key: string): string {
    return sessionStorage.getItem(key);
  }
  public  remove(key: string) {
    window.sessionStorage.removeItem(key);
  }

  public  clear() {
    window.sessionStorage.clear();
  }
}
