import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jbx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  links = { HOME: 'home', PROFILE: 'profile', SEARCH: 'search', JOB: 'job' }

  activeLink = this.links.PROFILE;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    this.router.navigateByUrl(link);
  }

  signOut() {
    this.router.navigateByUrl('auth');
  }

}
