import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { GenericService } from 'src/app/services/http-service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent implements OnInit {
  form: FormGroup;
  error: any;
  isBusy: boolean;
  /**
   *
   */
  constructor(
    private router: Router,
    private httpService: GenericService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.isBusy = true;
    this.httpService.post('user/login', this.form.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.password);
        localStorage.setItem('firstName', `${data.firstName}`);
        localStorage.setItem('lastName', `${data.lastName}`);
        localStorage.setItem('email', `${data.email}`);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.error = err.error;
        this.isBusy = false;
      }
    });
  }
}
