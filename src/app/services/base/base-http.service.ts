import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  protected get<T>(path: string) {
    return this.httpClient.get<T>(this._getURL(path));
  }

  protected getFile<T>(path: string) {
    return this.httpClient.get<T>(this._getURL(path), { responseType: 'blob' as 'json' });
  }

  protected post<T>(path: string, body: any) {
    return this.httpClient.post<T>(this._getURL(path), body);
  }

  protected patch<T>(path: string, body: any) {
    return this.httpClient.patch<T>(this._getURL(path), body);
  }

  protected delete<T>(path: string) {
    return this.httpClient.delete<T>(this._getURL(path));
  }

  private _getURL(path: string): string {
    return this.baseUrl + path;
  }
}
