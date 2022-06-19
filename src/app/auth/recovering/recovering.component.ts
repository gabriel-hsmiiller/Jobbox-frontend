import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPasswordDto } from 'src/app/models/recovery-password-dto';
import { AuthService } from 'src/app/services/auth.service';
import { EmailRequestService } from 'src/app/services/email-request.service';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password';

const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'jbx-recovering',
  templateUrl: './recovering.component.html',
  styleUrls: ['./recovering.component.scss']
})
export class RecoveringComponent implements OnInit {

  recoveringForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private _builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const { queryParams } = this.route.snapshot;

    this.recoveringForm = this._builder.group(
      {
        'email': new FormControl(queryParams.email),
        'newPassword': new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(PASS_REGEX)] }),
        'confirmNewPassword': new FormControl('', { validators: [Validators.required] }),
        'recoveryPasswordToken': new FormControl(queryParams.token)
      },
      {
        validators: [confirmPasswordValidator]
      }
    )
  }

  public get controls() {
    return this.recoveringForm.controls;
  }

  public async recovery () {

    if(this.recoveringForm.errors) {
      return;
    }

    const recoveryData = this.recoveringForm.value;

    try {
      const response = await this.authService.recovery(new RecoveryPasswordDto(recoveryData)).toPromise();

      console.log(response);

      if(response) {
        this.router.navigateByUrl('/auth/recovered');
      }
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  }

}
