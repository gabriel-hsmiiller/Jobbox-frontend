import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LocalStorageKey } from '../enum/local-storage-key';
import { UserType } from '../enum/user-type';
import { LocalStorageService } from '../services/local-storage.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'jbx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  links = { HOME: 'home', PROFILE: 'profile', SEARCH: 'search', JOB: 'job', MANAGEMENT: 'management' }
  userType?: UserType;
  UserType = UserType;
  activeLink = this.links.HOME;

  private routerSubscription!: Subscription;
  private messageSubscription!: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ws: WebsocketService,
    private localStorageService: LocalStorageService) {
      this.userType = (this.localStorageService.getKey(LocalStorageKey.USER_TYPE) as UserType) || undefined;
    }

  async ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      map((e: unknown) => (e as ActivationEnd).snapshot),
      filter(snapshot => snapshot.url.length > 0),
      map(snapshot => snapshot.url)
    ).subscribe((e) => {
      const currentPath = this.route.snapshot.firstChild?.url[0].path;
      this.activeLink = currentPath || 'home';
    })

    const currentPath = this.route.snapshot.firstChild?.url[0].path;
    this.activeLink = currentPath || 'home';

    // await this.ws.connect();

    // this.ws.messages.subscribe(msg => {
    //   console.log('Response from websocket: ' + msg);
    // });

    this.ws.getChat().subscribe(message => console.log(message), error => console.log(error));
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.messageSubscription?.unsubscribe();
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    this.router.navigateByUrl(link);
  }

  signOut() {
    this.router.navigateByUrl('/auth');
    this.localStorageService.clear();
  }

  emit() {
    let message = {
      source: '',
      content: ''
    };

    message.source = 'localhost';
    message.content = 'Some content';

    // this.ws.messages.next(message);

    this.ws.sendChat(message.content);

    // this.ws.sendMessage(message.content);
  }
}
