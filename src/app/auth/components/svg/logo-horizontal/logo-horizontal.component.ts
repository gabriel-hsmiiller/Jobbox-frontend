import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jbx-logo-horizontal',
  templateUrl: './logo-horizontal.component.html',
  styleUrls: ['./logo-horizontal.component.scss']
})
export class LogoHorizontalComponent implements OnInit {

  @Input() fillColor!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
