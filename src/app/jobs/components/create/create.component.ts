import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/app/enum/local-storage-key';
import { UserType } from 'src/app/enum/user-type';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'jbx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  jobForm!: FormGroup;
  private loggedUserType!: UserType;
  private loggedUserId!: number;

  constructor(builder: FormBuilder,
    private localStorageService: LocalStorageService,
    private jobsService: JobsService,
    private router: Router) {
      this.jobForm = builder.group({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        expires_at: new FormControl(null, [Validators.required]),
        has_expiration: new FormControl(true),
        autofill_colaborator: new FormControl(true)
      });
  }

  ngOnInit(): void {
    const userType = this.localStorageService.getKey(LocalStorageKey.USER_TYPE);
    if (!userType) {
      this.jobForm.disable();
      return;
    }

    this.loggedUserType = UserType[userType as UserType];

    if (this.loggedUserType !== UserType.CLIENT) {
      this.jobForm.disable();
      return;
    }

    const loggedUserData = User.fromJson(this.localStorageService.getKey(LocalStorageKey.USER_DATA) || '');

    this.loggedUserId = loggedUserData.id;
  }

  async onSubmit() {
    if (this.jobForm.invalid) {
      return;
    }

    const {value} = this.jobForm;
    if (value.expires_at) value.expires_at = new Date(value.expires_at);

    try {
      const response = await this.jobsService.createJob({ ...value, clientId: this.loggedUserId }).toPromise();
      console.log(response);
      this.router.navigateByUrl('/job');
    } catch (error) {
      console.log(error);
    }
  }
  
  getExpirationHasValidator() {
    return this.jobForm?.controls?.expires_at?.hasValidator(Validators.required);
  }

  onChangeHasExpiration() {
    if (this.jobForm.get('has_expiration')?.value) {
      this.jobForm.get('expires_at')?.addValidators(Validators.required);
    } else {
      this.jobForm.get('expires_at')?.removeValidators(Validators.required);
    }
    this.jobForm.get('expires_at')?.updateValueAndValidity();
  }

  navigateToList() {
    this.router.navigateByUrl('/job');
  }

}
