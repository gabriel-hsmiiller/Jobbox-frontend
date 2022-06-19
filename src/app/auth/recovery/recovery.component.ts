import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailRequestService } from 'src/app/services/email-request.service';

@Component({
  selector: 'jbx-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  recoveryForm!: FormGroup;

  constructor(
    private emailService: EmailRequestService, 
    private _builder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.recoveryForm = this._builder.group(
      {
        'email': new FormControl('', { validators: [Validators.required, Validators.email] }), 
      }
    )
  }

  public get controls() {
    return this.recoveryForm.controls;
  }

  public async recovery () {

    if(this.recoveryForm.errors) {
      return;
    }

    const recoveryData = this.recoveryForm.value;

    try {
      const response = await this.emailService.requestRecovery(recoveryData.email).toPromise();

      console.log(response);

      if(response) {
        this.router.navigateByUrl('/auth/token-sent');
      }
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }


  }

}
