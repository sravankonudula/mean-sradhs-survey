import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public errorMessage: string;

  constructor(private router: Router,
              private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.user = new User();
  }

  register(form:NgForm): void {
    if (form.valid)
    {
      // perform authentication
      this.auth.register(this.user).subscribe(data => {
        debugger
        if (data.success)
        {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigateByUrl('admin/login');
        }
      },
      error => {
        debugger
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
      );
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }
  
}
