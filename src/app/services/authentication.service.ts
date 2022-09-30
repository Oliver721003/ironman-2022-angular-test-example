import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _url = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<boolean> {
    return this.httpClient
      .get<User>(`${this._url}/${user.id}`)
      .pipe(map((data) => data.password === user.password));
  }

  isExists(id: string): Observable<boolean> {
    return this.httpClient.get<User>(`${this._url}/${id}`).pipe(
      catchError(() => of(false)),
      map((user) => !!user)
    );
  }
}
