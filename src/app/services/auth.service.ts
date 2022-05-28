import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/auth/login-response';
import { SignupResponse } from '../interfaces/auth/signup-response';
import { LoginDto } from "../models/login-dto";
import { SignupDto } from '../models/signup-dto';
import { BaseHttpService } from './base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  public login(loginData: LoginDto): Observable<LoginResponse> {
    return super.post<LoginResponse>('/user/authentication/login', loginData);
  }

  public signup(signupData: SignupDto): Observable<SignupResponse> {
    return super.post<SignupResponse>('/user/authentication/signup', signupData);
  }
}
