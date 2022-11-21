import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface MembershipCartItem {
  id: string,
  name: string,
  startDate: Date;
  price: number;
}

@Injectable({providedIn: "root"})
export class CartService {

  cartItemsChange = new Subject<number>();

  private itemsInMembershipCart: MembershipCartItem[] = []

  addToMemberhipCart(itemToAdd: MembershipCartItem) {
    // for (const item of this.itemsInMembershipCart) {
    //   if(item.id === itemToAdd.id) {
    //     return;
    //   }
    // }
    this.itemsInMembershipCart.push(itemToAdd);
    return this.cartItemsChange.next(this.itemsInMembershipCart.length);

  }

  removeFromMembershipCart(itemToRemove: MembershipCartItem) {

    return this.cartItemsChange.next(this.itemsInMembershipCart.length);
  }

  getCartItems() {
    return this.itemsInMembershipCart.slice();
  }
}
