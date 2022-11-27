import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ProductType} from "../../shared/models/ProductType";
import {ProductService} from "../../shared/service/ProductService";
import {CartService, ProductCartItem} from "../../shared/service/CartService";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-product-types",
  templateUrl: "product-types.component.html",
  styleUrls: ["product-types.component.scss"]
})
export class ProductTypesComponent implements OnInit{

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource!: MatTableDataSource<ProductType>;

  @Input() isSellingMode = true;
  @Input() isManagementPage = false;

  columns = ["name", "quantity", "price"];

  searchForm!: FormGroup;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(private productService: ProductService,
              private cart: CartService,
              private fb: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    this.searchForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      name: ['']
    })
    if(this.isManagementPage) {
      this.columns = [...this.columns, "edit", "delete"]
    }
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
    if(this.isSellingMode) {
      const itemToAdd: ProductCartItem = {
        id: product.productTypeId!,
        name: product.name,
        quantity: this.searchForm.value['quantity'],
        price: this.searchForm.value['quantity']*product.price
      }
      this.cart.addToProductCart(itemToAdd);
    }
  }

  searchByName() {
    this.getProducts(this.searchForm.value["name"]);
  }

  editProduct(product: ProductType) {

  }

  deleteProduct(id: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent);
    this.confirmDialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.getProducts("");
          }
        })
          }
        })
      }

}
