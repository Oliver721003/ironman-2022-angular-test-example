import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  protected readonly form: FormGroup = this.fb.group({
    id: this.fb.control<string | null>(null, {
      validators: [Validators.required],
      asyncValidators: [this.shouldBeExists.bind(this)],
      updateOn: 'blur',
    }),
    password: this.fb.control<string | null>(null, {
      validators: [Validators.required],
    }),
  });

  get id(): FormControl<string | null> {
    return this.form.get('id') as FormControl<string | null>;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authenticationService.login(this.form.value).subscribe((result) => {
      if (result) {
        this.snackBar.open('登入成功');
      } else {
        this.snackBar.open('登入失敗');
      }
    });
  }

  shouldBeExists(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (
      control.value === undefined ||
      control.value === null ||
      control.value === ''
    ) {
      return of(null);
    }

    return this.authenticationService.isExists(control.value).pipe(
      map((exists) => {
        if (exists) {
          return null;
        } else {
          return { shouldBeExists: true };
        }
      })
    );
  }
}
