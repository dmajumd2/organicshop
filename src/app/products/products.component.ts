import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../shared/models/product';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: String;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {

      
     //observables: go to firebase for all the products
      productService.getAll().subscribe(products => {
          this.products = products

          //observables: to get the current route paramenters
          route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          //filter of categories in home page
          this.filteredProducts = (this.category) ?
              this.products.filter(p => p.category === this.category) :
              this.products;
            });
    });
   
  } 

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
