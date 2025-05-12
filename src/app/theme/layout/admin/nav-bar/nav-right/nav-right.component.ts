// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  fullName: string;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.fullName = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
  }

  myProfile(): void {
    this.router.navigate(['my-profile']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['auth/signin']);
  }
}
