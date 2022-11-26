import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {CartItems, CartService, MembershipCartItem, ProductCartItem} from "../../shared/service/CartService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "cart.component.html",
  styleUrls: ["cart.component.scss"]
})
export class CartComponent implements OnInit{
  cartItems!: CartItems
  memberships!: MatTableDataSource<MembershipCartItem>
  products!: MatTableDataSource<ProductCartItem>
  userId!: string

  productColumns = ["name", "quantity", "price", "delete"];
  membershipColumns = ["name", "startDate", "price", "delete"]

  constructor(private cart: CartService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getCartItems();
    this.route.parent?.params.subscribe((params) => {
      this.userId = params["userId"];
    })
  }

  getCartItems() {
    this.cartItems = this.cart.getCartItems();
    this.memberships = new MatTableDataSource<MembershipCartItem>(this.cartItems.memberships);
    this.products = new MatTableDataSource<ProductCartItem>(this.cartItems.products);
  }

  sellItems(paymentMethod: string) {
    if (this.cartItems.memberships.length > 0) {
      this.cart.sellMemberships(this.userId, paymentMethod)
    }
    if (this.cartItems.products.length > 0) {
      this.cart.sellProducts(this.userId, paymentMethod)
    }
    this.router.navigate(["profile", this.userId, "memberships"]);
  }

  deleteProduct(id: string) {
    this.cart.removeFromProductCart(id);
    this.getCartItems();
  }

  deleteMembership(id: string) {
    this.cart.removeFromMembershipCart(id);
    this.getCartItems();
  }
}
