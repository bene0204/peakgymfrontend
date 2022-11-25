import {Component, OnInit} from "@angular/core";
import {UserEntity} from "../../shared/models/UserEntity";
import {AuthService} from "../../shared/service/AuthService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/service/UserService";
import {CartService} from "../../shared/service/CartService";
import {MatDialog,  MatDialogRef} from "@angular/material/dialog";
import {GuestFormComponent} from "../guest-form/guest-form.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "user-profile.component.html",
  styleUrls: ["user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit{
  user?: UserEntity | null;
  itemsInCartCount = 0;
  dialogRef!: MatDialogRef<GuestFormComponent>;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private cart: CartService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUserProfile()
    this.subToCartItems()
    this.navigateToMemberships()
  }

  get getYears() {
    let birthDate = new Date(this.user!.birthDate);
    let today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || today.getDate() < birthDate.getDate()) {
      years -= 1;
    }
    return years;
  }

  getUserProfile() {
    this.route.url.subscribe(url => {
      for (const urlSegment of url) {
        if (urlSegment.path === "me") {
          this.authService.user.subscribe({
            next: (user) => {
              return this.user = user;
            }
          })
        }
      }
      this.route.params.subscribe({
        next: (params) => {
          if (params["userId"]) {
            this.getUserById(params["userId"]);
          }
        }
      })
    })
  }

  getUserById(userId: string) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        return this.user = user;
      }
    })
  }

  updateUserInfo() {
    this.dialogRef = this.dialog.open(GuestFormComponent, {data: this.user})
      this.dialogRef.afterClosed()
      .subscribe(() => {
        this.getUserProfile()
      })
  }

  subToCartItems() {
    this.cart.cartItemsChange.subscribe(itemCount => this.itemsInCartCount=itemCount)
  }

  navigateToMemberships() {
    this.router.navigate(['memberships'], {relativeTo: this.route})
  }

  navigateToProducts() {
    this.router.navigate(['products'], {relativeTo: this.route})
  }

  navigateToCart() {
    this.router.navigate(['cart'], {relativeTo: this.route});
  }
}
