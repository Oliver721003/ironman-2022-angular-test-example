import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  protected readonly form: FormGroup = this.fb.group({
    id: this.fb.control<string | null>(null, {
      validators: [Validators.required],
    }),
    password: this.fb.control<string | null>(null, {
      validators: [Validators.required],
    }),
  });

  get id(): FormControl<string | null> {
    return this.form.get('id') as FormControl<string | null>;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
