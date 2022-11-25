import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {CartItems, CartService, MembershipCartItem, ProductCartItem} from "../../shared/service/CartService";

@Component({
  selector: "app-cart",
  templateUrl: "cart.component.html",
  styleUrls: ["cart.component.scss"]
})
export class CartComponent implements OnInit{
  cartItems!: CartItems
  memberships!: MatTableDataSource<MembershipCartItem>
  products!: MatTableDataSource<ProductCartItem>

  productColumns = ["name", "quantity", "price", "delete"];
  membershipColumns = ["name", "startDate", "price", "delete"]

  constructor(private cart: CartService) {
  }

  ngOnInit() {
    this.cartItems = this.cart.getCartItems();
    this.memberships = new MatTableDataSource<MembershipCartItem>(this.cartItems.memberships);
    this.products = new MatTableDataSource<ProductCartItem>(this.cartItems.products);
  }

  deleteProduct(id: string) {

  }

  deleteMembership(id: string) {

  }
}
