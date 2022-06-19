import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailRequestService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  public requestRecovery(email: string) {
    return super.get('/email/recovery/' + email);
  }

  public requestValidate(email: string) {
    return super.get('/email/validate/' + email);
  }

  public request2Steps(email: string) {
    return super.get('/email/2steps/' + email);
  }
}
