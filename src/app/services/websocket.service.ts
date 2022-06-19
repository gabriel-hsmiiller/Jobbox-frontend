import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer, of } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';

const CHAT_URL = 'ws://localhost:4700';

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private socket!: WebSocket;
  // private WS_PROTOCOL = 'jobbox';
  // private MESSAGE_OPERATION = 'messages'
  // public onMessageEvent: Subject<any> = new Subject<any>();

  // private listeners: any;

  // constructor() {
  //   this.listeners = {
  //     [this.MESSAGE_OPERATION] : this.onMessageEvent
  //   }
  // }

  // async connect() {
  //   if (!this.socket) {
  //     this.socket = new WebSocket(CHAT_URL, this.WS_PROTOCOL);
  //   }
  //   this.socket.onopen = async () => {
  //     console.log('open connection');
  //   }

  //   this.socket.onmessage = (evt) => {
  //     const received = JSON.parse(evt.data);
  //     const listener = this.listeners[received.operation];
  //     if (listener) {
  //       listener.next(received);
  //     }
  //   }

  //   this.socket.onclose = () => {
  //     setTimeout(() => this.connect(), 5000);
  //   }

  //   this.socket.onerror = async () => {
  //     console.log('error occured');
  //   }
  // }

  // sendMessage(message: string) {
  //   this.socket.send(message);
  // }

  // private subject!: AnonymousSubject<MessageEvent>;
  // public messages!: Subject<Message>;

  // constructor() {
  //   this.messages = <Subject<Message>>this.connect(CHAT_URL).pipe(
  //     map(
  //       (response: MessageEvent): Message => {
  //         console.log(response.data);
  //         let data = JSON.parse(response.data);
  //         return data;
  //       }
  //     )
  //   )
  // }

  // public connect(url: string): AnonymousSubject<MessageEvent> {
  //   if (!this.subject) {
  //     this.subject = this.create(url);
  //     console.log('Successfully connected: ' + url);
  //   }
  //   return this.subject;
  // }

  // private create(url: string): AnonymousSubject<MessageEvent> {
  //   let ws = new WebSocket(url);
  //   let observable = new Observable((obs: Observer<MessageEvent>) => {
  //     ws.onmessage = obs.next.bind(obs);
  //     ws.onerror = obs.error.bind(obs);
  //     ws.onclose = obs.complete.bind(obs);
  //     return ws.close.bind(ws);
  //   });

  //   let observer = {
  //     error: () => null,
  //     complete: () => null,
  //     next: (data: Object) => {
  //       if(ws.readyState === WebSocket.OPEN) {
  //         console.log('Message sent to websocket: ', data);
  //         ws.send(JSON.stringify(data));
  //       }
  //     }
  //   }

  //   return new AnonymousSubject<MessageEvent>(observer, observable);
  // }

  constructor(private socket: Socket) {
    try {
      console.log('trying to connect');
      const connected = this.socket.connect();
      console.log('connected? ', connected);
    } catch (error) {
      console.log(error);
    }
  }

  sendChat(message: string) {
    try {
      const emitted = this.socket.emit('events', message);
      console.log('emmited? ', emitted);
    } catch (error) {
      console.log(error);
    }
  }

  getChat() {
    try {
      console.log('getting msg')
      return this.socket.fromEvent('events');
    } catch (error) {
      console.log(error);
      return of(null);
    }
  }
}
