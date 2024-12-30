import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { UserServicesService } from '../../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatCheckboxModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginData !: FormGroup;
  showHeaderSidebar = false;
  hide = signal(true);

  constructor(
    private fb: FormBuilder,
    private api: UserServicesService, 
    private route: Router, 
    private snackBar: MatSnackBar,
    private title: Title,
  ) {
    this.loginData = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control(''),
    });
  }

  ngOnInit(): void {
    this.title.setTitle("Admin login page");
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    this.api.login(this.loginData.value).subscribe({
      next: ((res: any) => {
        if(res.status === 1 && res.message === 'SUCCESS') {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("refresh_token", res.data.refresh_token);
          window.localStorage.setItem("username", res.data.username);
          window.localStorage.setItem("userId", res.data.userId);
          this.snackBar.open("Login Successfully", "Close", { verticalPosition: 'top', duration: 2000 });          
        } else if (res.status === 0 && res.message === 'FAILED'){
          this.snackBar.open("Login Failed", "Close", { duration: 2000, verticalPosition: 'top' });
        } 
      }),
      error: () => {
        this.snackBar.open("Internal Server Error", "Ok", { duration: 2000, verticalPosition: 'top'});
      },
      complete: () => {
        this.route.navigate(['/home']);
      }
    })
  }
}
