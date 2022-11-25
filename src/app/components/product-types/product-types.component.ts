import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ProductType} from "../../shared/models/ProductType";
import {ProductService} from "../../shared/service/ProductService";
import {CartService, ProductCartItem} from "../../shared/service/CartService";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-product-types",
  templateUrl: "product-types.component.html",
  styleUrls: ["product-types.component.scss"]
})
export class ProductTypesComponent implements OnInit{

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource!: MatTableDataSource<ProductType>;

  columns = ["name", "quantity", "price"];

  searchForm!: FormGroup;

  constructor(private productService: ProductService,
              private cart: CartService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

    this.searchForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      name: ['']
    })
    this.initDataSource();
  }

  initDataSource() {
    this.sort.active = "name"
    this.sort.direction = "asc"
    this.getProducts("")
  }

  getProducts(name: string) {
    this.productService.getProductTypes(name).subscribe((products) => {
      this.dataSource = new MatTableDataSource<ProductType>(products);
      this.dataSource.sort = this.sort;
    })
  }

  addToCart(product: ProductType) {
    const itemToAdd: ProductCartItem = {
      id: product.productTypeId,
      name: product.name,
      quantity: this.searchForm.value['quantity'],
      price: this.searchForm.value['quantity']*product.price
    }
    this.cart.addToProductCart(itemToAdd);
  }

  searchByName() {
    this.getProducts(this.searchForm.value["name"]);
  }
}
