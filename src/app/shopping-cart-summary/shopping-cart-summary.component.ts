import { ShoppingCart } from '../shared/models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  // input cart which have all shopping cart details from checkout component 
  @Input('cart') cart: ShoppingCart;
}
