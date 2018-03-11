import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  category: String;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
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

}
