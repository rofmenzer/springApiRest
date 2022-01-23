import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number | undefined;
  data: Product;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.data= new Product(0, "", "", "");
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
  update() {
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['list']);
    })
  }

}
