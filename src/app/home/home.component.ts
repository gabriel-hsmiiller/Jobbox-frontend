import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'jbx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  links = { HOME: 'home', PROFILE: 'profile', SEARCH: 'search', JOB: 'job' }

  activeLink = this.links.PROFILE;

  private routerSubscription!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    this.router.navigateByUrl(link);
  }

  signOut() {
    this.router.navigateByUrl('auth');
  }

}
