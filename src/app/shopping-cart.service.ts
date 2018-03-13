import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
        dateCreated: new Date().getTime()
    });
  }

  //method for reading a shopping cart from firebase
  private getCart(cartId: string){
    return this.db.object('/shopping-carts/' + cartId);
  }

  //this function will search the cartid in locatstorage, if not then from shopping cart
  //service create will call the firebase to add a key to the shopping cart and return that
  // key and set that key to the local storage, so that the key can be used in future
  // for getting info of the users shopping cart from the local storage
  private async getOrCreateCart(){

    let cartId = localStorage.getItem('cartId');
      if(!cartId){
        let result = await this.create();
        localStorage.setItem('cartId', result.key);
        return this.getCart(result.key);
      }  

        return this.getCart(cartId);  //give cart id that we found in local storage
   }

}

// in typescript if we have a async method that return a promise and you want to call
// it like sync method then apply await operator and use aync keyword for method,
// with this we can call async method just like a sync method
// this will not wait for the result of the promise and will execute exactly like other
// code