import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jbx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sections = [
    { label: 'Usuários', icon: 'users_item.svg', route: './users' },
    { label: 'Jobs', icon: 'jobs_item.svg', route: './jobs' },
    // { label: 'Relatórios', icon: 'chart_item.svg', route: './reports' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
