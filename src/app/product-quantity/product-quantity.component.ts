import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  //called from click event from (+) button
 addToCart(){
    this.shoppingCartService.addToCart(this.product);   
 }

 //called from click event from (-) button
 removeFromCart(){
  this.shoppingCartService.removeFromCart(this.product);
 }

 

}
