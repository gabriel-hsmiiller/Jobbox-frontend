import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password';

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'jbx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private authService: AuthService, 
    private _builder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.signupForm = this._builder.group(
      {
        'name': new FormControl('', { validators: [Validators.required] }), 
        'surname': new FormControl('', { validators: [Validators.required] }), 
        'email': new FormControl('', { validators: [Validators.required, Validators.email] }), 
        'password': new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(PASS_REGEX)] }),
        'confirmPassword': new FormControl('', { validators: [Validators.required] }),
        'privacyPolicy': new FormControl(false),
        'termsOfUsage': new FormControl(false)
      },
      {
        validators: [confirmPasswordValidator]
      }
    )
  }

  public get controls() {
    return this.signupForm.controls;
  }

  public async signup () {

    const { privacyPolicy, termsOfUsage } = this.signupForm.value;

    if (!privacyPolicy || !termsOfUsage) {
      return;
    }

    if(this.signupForm.errors) {
      return;
    }

    const signupData = this.signupForm.value;

    delete signupData.privacyPolicy;
    delete signupData.termsOfUsage;

    try {
      const response = await this.authService.signup(signupData).toPromise();

      if(response) {
        this.router.navigateByUrl('/login')
      }
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }


  }

}
