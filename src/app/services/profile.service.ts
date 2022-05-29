import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseHttpService } from './base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseHttpService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserById(id: string): Observable<User> {
    return super.get<User>('/user/find/i/' + id);
  }

  getAllColaborators(): Observable<Array<User>> {
    return super.get<Array<User>>('/user/find/c/');
  }

  updateUserById(id: string, data: FormData): Observable<User> {
    return super.patch<User>('/user/update/' + id, data);
  }

  deleteUserById(id: string): Observable<any> {
    return super.delete<any>('/user/delete/' + id);
  }
}
