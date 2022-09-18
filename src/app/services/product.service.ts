import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, toArray } from 'rxjs';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _url = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  getProduct(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this._url}/${id}`)
      .pipe(map((product) => new Product(product)));
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this._url).pipe(
      mergeMap((products) => products),
      map((product) => new Product(product)),
      toArray()
    );
  }
}
