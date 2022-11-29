import {Component, OnInit} from "@angular/core";
import {UserEntity} from "../../shared/models/UserEntity";
import {AuthService} from "../../shared/service/AuthService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/service/UserService";
import {CartService} from "../../shared/service/CartService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GuestFormComponent} from "../guest-form/guest-form.component";
import {Membership} from "../../shared/models/Membership";
import {MembershipService} from "../../shared/service/MembershipService";
import {MembershipStatus} from "../../shared/enums/MembershipStatus";
import {KeysDialogComponent} from "../dialog/keys-dialog/keys-dialog.component";
import {KeyService} from "../../shared/service/KeyService";

@Component({
  selector: "app-user-profile",
  templateUrl: "user-profile.component.html",
  styleUrls: ["user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit{
  user?: UserEntity | null;
  itemsInCartCount = 0;
  guestFormComponentMatDialogRef!: MatDialogRef<GuestFormComponent>;
  keysDialogRef!: MatDialogRef<KeysDialogComponent>
  recentMemberships: Membership[] = [];
  isAnyActive = false;
  activeMemberships: Membership[] = [];
  userKey?: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private cart: CartService,
              public dialog: MatDialog,
              private membershipService: MembershipService,
              private keyService: KeyService) {
  }

  ngOnInit() {
    this.getUserProfile()
    this.subToCartItems()
    this.navigateToMemberships()
    this.subToRecentMemberships()
    this.getUserKey()
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
        this.getUserKey()
        return this.user = user;
      }
    })
  }

  updateUserInfo() {
    this.guestFormComponentMatDialogRef = this.dialog.open(GuestFormComponent, {data: this.user})
      this.guestFormComponentMatDialogRef.afterClosed()
      .subscribe(() => {
        this.getUserProfile()
      })
  }

  subToCartItems() {
    this.cart.cartItemsChange.subscribe(itemCount => this.itemsInCartCount=itemCount)
  }

  subToRecentMemberships() {
    this.membershipService.recentMemberships.subscribe((memberships) => {
      this.recentMemberships = memberships;
      this.isAnyActive = this.areMembershipsActive();
    })
  }

  checkInUser() {
    if(!this.userKey) {
      this.keysDialogRef = this.dialog.open(KeysDialogComponent)
      this.keysDialogRef.afterClosed().subscribe((key) => {
        if (key) {
          this.keyService.checkInUser(key, {
            membershipId: this.activeMemberships[0].membershipId,
            userId: this.user!.userId
          }).subscribe((keys) => {
            for (const key of keys) {
              if(key.userId?.userId === this.user?.userId) {
                this.userKey = key.key
              }
            }
            this.membershipService.rerun();
          })
        }
      })
    } else {
      this.keyService.checkOutUser(this.userKey).subscribe(() => {
        this.userKey = undefined;
      })
    }
  }

  getUserKey(){
    this.keyService.getKeys().subscribe((keys) => {
      for (const key of keys) {
        if(key.userId?.userId === this.user?.userId) {
          this.userKey = key.key
        }
      }
    })
  }

  areMembershipsActive() {
    this.activeMemberships = this.recentMemberships.filter(membership =>
      this.membershipService.isActive(membership) === MembershipStatus.ACTIVE
      || this.membershipService.isActive(membership) === MembershipStatus.EXPIRING);
      return this.activeMemberships.length > 0;
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
