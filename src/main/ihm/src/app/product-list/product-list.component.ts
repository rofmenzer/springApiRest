import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsData: any;

  constructor(
    public apiService: ApiService
  ) {
    this.productsData = [];
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    //Get saved list of products
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.productsData = response;
    })
  }
  delete(item: any) {
    //Delete item in Product data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllProducts();
    });
  }

}
