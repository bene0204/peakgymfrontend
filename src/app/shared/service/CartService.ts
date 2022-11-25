import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export interface MembershipCartItem {
  id: string,
  name: string,
  startDate: Date;
  price: number;
}

export interface ProductCartItem {
  id:string,
  name:string,
  quantity:number,
  price:number
}

export interface CartItems {
  memberships: MembershipCartItem[],
  products: ProductCartItem[]
}

@Injectable({providedIn: "root"})
export class CartService {

  cartItemsChange = new Subject<number>();

  private itemsInMembershipCart: MembershipCartItem[] = []
  private itemsInProductCart: ProductCartItem[] = []

  addToMemberhipCart(itemToAdd: MembershipCartItem) {
    this.itemsInMembershipCart.push(itemToAdd);
    this.emitItemNumber();
  }

  addToProductCart(itemToAdd: ProductCartItem){
    for (const item of this.itemsInProductCart) {
      if(item.id === itemToAdd.id) {
        item.quantity += itemToAdd.quantity;
        item.price += itemToAdd.price;
        return this.emitItemNumber();
      }
    }
    this.itemsInProductCart.push(itemToAdd);
    return this.emitItemNumber();
  }

  removeFromMembershipCart(itemToRemove: MembershipCartItem) {

    return this.emitItemNumber();
  }

  emitItemNumber() {
    this.cartItemsChange.next(this.itemsInMembershipCart.length + this.itemsInProductCart.length);
  }

  getCartItems(): CartItems {
    return {
      ["memberships"]: this.itemsInMembershipCart.slice(),
      ["products"]: this.itemsInProductCart.slice()
    };
  }
}
