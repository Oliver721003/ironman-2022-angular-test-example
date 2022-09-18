import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _url = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  isExists(id: string): Observable<boolean> {
    return this.httpClient.get<User>(`${this._url}/${id}`).pipe(
      catchError(() => of(false)),
      map((user) => !!user)
    );
  }
}
