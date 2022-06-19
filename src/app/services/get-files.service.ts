import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base/base-http.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetFilesService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getAvatarFile(path: string): Observable<any> {
    return super.getFile<any>('/uploads/avatars/' + path);
  }

  getPortfolioFile(path: string): Observable<any> {
    return super.getFile<any>('/uploads/portfolio/' + path);
  }
}
