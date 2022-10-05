import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { delay, of } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthenticationService', ['isExists']);
    authService.isExists.and.returnValue(of(false).pipe(delay(1000)));

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
      ],
      declarations: [LoginPageComponent],
      providers: [{ provide: AuthenticationService, useValue: authService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('元件應可以被建立', () => expect(component).toBeTruthy());

  it('當帳號不存在時, 應顯示錯誤訊息為 "此帳號不存在"', async () => {
    // Arrange
    const formFieldElement = fixture.debugElement.query(
      By.directive(MatFormField)
    );
    const inputElement: HTMLInputElement = formFieldElement.query(
      By.css('input')
    ).nativeElement;

    // Act
    inputElement.value = 'oliver';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    fixture.detectChanges();

    // Assert
    const errorElement = formFieldElement.query(By.directive(MatError));
    expect(errorElement.nativeElement.textContent.trim()).toBe('此帳號不存在');
  });
});
