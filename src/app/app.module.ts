import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { JwtModule } from '@auth0/angular-jwt';
import { LocalStorageKey } from './enum/local-storage-key';
import { NgChartsModule } from 'ng2-charts';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:4700',
  options: {
    reconnectionDelay: 10000,
    transportOptions: {
      polling: {
        extraHeaders: {
          'Sec-WebSocket-Protocol': 'jobbox'
        }
      }
    },
    path: 'test'
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(LocalStorageKey.TOKEN),
        authScheme: () => 'Bearer '
      }
    }),
    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
