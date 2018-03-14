import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
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

 //for displaying the quantity when clicking add to cart 
 getQuantity(){
   if(!this.shoppingCart) return 0;

   let item = this.shoppingCart.items[this.product.$key];
   return item ? item.quantity : 0;
 }

}
