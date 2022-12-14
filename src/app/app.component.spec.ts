import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('元件應可以被建立', () => expect(component).toBeDefined());

  it('標題應顯示為"2022 鐵人賽範例"', () => {
    // Arrange
    const titleElement = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;

    // Act

    // Assert
    expect(titleElement.textContent).toBe('2022 鐵人賽範例');
  });
});
