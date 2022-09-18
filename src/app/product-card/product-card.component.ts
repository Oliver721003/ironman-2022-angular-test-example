import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @HostBinding('class') class = 'product-card';

  constructor() {}

  ngOnInit(): void {}
}
