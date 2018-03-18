import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


   //method for reading a shopping cart from firebase
   async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart(x.items))
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove(); 
  }

  async addToCart(product: Product){
    this.updateItem(product, 1);
  }

 // called when (-) click event trigger fot removing from the cart 
  async removeFromCart(product: Product){
   this.updateItem(product, -1);
  }


  private create() {
    return this.db.list('/shopping-carts').push({
        dateCreated: new Date().getTime()
    });
  }

 
  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  //this function will search the cartid in locatstorage, if not then from shopping cart
  //service create will call the firebase to add a key to the shopping cart and return that
  // key and set that key to the local storage, so that the key can be used in future
  // for getting info of the users shopping cart from the local storage
  private async getOrCreateCartId() : Promise<string>{

    let cartId = localStorage.getItem('cartId');
      if(cartId) return cartId;     //give cart id that we found in local storage

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
          
   }

   

   private async updateItem(product: Product, change: Number){
     //ref to the users shopping cart
     let cartId = await this.getOrCreateCartId(); // return observable Promise from firebase
     let item$ = this.getItem(cartId, product.$key);
     item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if(quantity === 0) item$.remove();
      else item$.update({ 
         title: product.title,
         imageUrl: product.imageUrl,
         price: product.price,
         quantity: quantity
        });
     });
   } 

}

// in typescript if we have a async method that return a promise and you want to call
// it like sync method then apply await operator and use aync keyword for method,
// with this we can call async method just like a sync method
// this will not wait for the result of the promise and will execute exactly like other
// code

