import {Injectable} from "@angular/core";

export interface CartItem {
  id: string,
  name: string,
  quantity: number,
  price: number;
}

@Injectable({providedIn: "root"})
export class CartService {

  private itemsInCart: CartItem[] = []

  addToCart(itemToAdd: CartItem) {
    for (const item of this.itemsInCart) {
      if(item.id === itemToAdd.id) {
        return item.quantity += 1;
      }
    }
    return this.itemsInCart.push(itemToAdd);
  }

  getCartItems() {
    return this.itemsInCart.slice();
  }
}
