import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailConfirmationResponse } from '../interfaces/auth/email-confirmation-response';
import { LoginResponse } from '../interfaces/auth/login-response';
import { RecoveryPasswordResponse } from '../interfaces/auth/recovery-password-response';
import { SignupResponse } from '../interfaces/auth/signup-response';
import { EmailConfirmationDto } from '../models/email-confirmation-dto';
import { LoginDto } from "../models/login-dto";
import { RecoveryPasswordDto } from '../models/recovery-password-dto';
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

  public recovery(recoveryPasswordData: RecoveryPasswordDto): Observable<RecoveryPasswordResponse> {
    return super.post<RecoveryPasswordResponse>('/user/authentication/recovery', recoveryPasswordData);
  }

  public validate(emailConfirmationData: EmailConfirmationDto): Observable<EmailConfirmationResponse> {
    return super.post<EmailConfirmationResponse>('/user/authentication/validate', emailConfirmationData);
  }
}
