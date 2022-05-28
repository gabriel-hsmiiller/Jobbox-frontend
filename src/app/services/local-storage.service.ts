import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../enum/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getKey(key: LocalStorageKey) {
    return localStorage.getItem(key);
  }

  setkey(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  removeKey(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}
