import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  providers = [];
  constructor(private readonly route: Router) {}

  ngOnInit(): void {}
  loadProfile = () => this.route.navigateByUrl('/');
}
