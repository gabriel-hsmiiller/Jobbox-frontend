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

  getAllUser(showInactives: boolean): Observable<Array<User>> {
    return super.get<Array<User>>('/user?showInactives=' + (showInactives ? '1' : '0'));
  }

  getUserById(id: string): Observable<User> {
    return super.get<User>('/user/find/i/' + id);
  }

  getAllColaborators(): Observable<Array<User>> {
    return super.get<Array<User>>('/user/find/c/');
  }

  getUserByName(name: string): Observable<Array<User>> {
    return super.get<Array<User>>('/user/find/n/' + name);
  }

  updateUserById(id: string, data: FormData): Observable<User> {
    return super.patch<User>('/user/update/' + id, data);
  }

  updateUserStatus(id: string, status: boolean): Observable<User> {
    return super.patch<User>('/user/updateStatus/' + id, { status });
  }

  deleteUserById(id: string): Observable<any> {
    return super.delete<any>('/user/delete/' + id);
  }
}
