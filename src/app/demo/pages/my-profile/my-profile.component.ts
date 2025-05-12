import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, finalize } from 'rxjs';
import { GenericService } from 'src/app/services/http-service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [SharedModule],
  providers: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export default class MyProfileComponent implements OnInit {
  form: FormGroup;
  error: any;
  isBusy: boolean = false;

  constructor(
    private httpService: GenericService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(''),
      password: new FormControl('', Validators.required),
      newPassword: new FormControl(''),
      newUsername: new FormControl(''),
      username: new FormControl({ value: '', disabled: true }, Validators.required)
    });

    this.form.patchValue({
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      username: localStorage.getItem('email')
    });
  }

  save() {
    this.isBusy = true;
    this.httpService.post('user/Save', this.form.value).subscribe({
      next: (resp) => {
        localStorage.setItem('firstName', `${resp.firstName}`);
        localStorage.setItem('lastName', `${resp.lastName}`);
        localStorage.setItem('email', `${resp.email}`);

        this.messageService.success('Profile updated');
      },
      error: (err) => {
        this.messageService.error(err.error);
      },
      complete: () => {
        this.isBusy = false;
      }
    });
  }
}
