import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderPriceComputeService {
  constructor() {}

  compute(values: number[]): number {
    const total = values
      .map((value) => value)
      .reduce((acc, value) => acc + value, 0);

    if (total > 5000) {
      return total * 0.8;
    } else if (total > 3000) {
      return total * 0.9;
    } else if (total > 1000) {
      return total * 0.95;
    } else {
      return total;
    }
  }
}
