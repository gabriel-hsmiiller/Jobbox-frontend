import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { LoginDto } from 'src/app/models/login-dto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'jbx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService, 
    private _builder: FormBuilder, 
    private localstorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this._builder.group(
      {
        'email': new FormControl('', { validators: [Validators.required, Validators.email] }), 
        'password': new FormControl('', { validators: [Validators.required] }),
        'rememberMe': new FormControl(false)
      }
    )
  }

  public get controls() {
    return this.loginForm.controls;
  }

  public async login() {
    if (this.loginForm.errors) return;

    const loginData: LoginDto = this.loginForm.value;

    try {
      const response = await this.authService.login(loginData).toPromise();
  
      if (response) {
        if (response.token)
          this.localstorage.setkey(LocalStorageKey.TOKEN, response.token);
  
        if (response.user)
          this.localstorage.setkey(LocalStorageKey.USER_DATA, JSON.stringify(response.user));
  
        if(response.token)
          this.localstorage.setkey(LocalStorageKey.USER_TYPE, response.type);

        this.router.navigateByUrl('/profile');
      }
    } catch (error) {
      console.log(error);
      // TODO: handle errors
    }
  }

}
