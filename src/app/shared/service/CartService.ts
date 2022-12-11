import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) {
  }

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

  removeFromMembershipCart(id: string) {
    const filteredList = this.itemsInMembershipCart.filter(membership =>  membership.id != id)
    this.itemsInMembershipCart = [...filteredList];
    this.emitItemNumber();
  }

  removeFromProductCart(id: string) {
    const filteredList = this.itemsInProductCart.filter(product => product.id != id)
    this.itemsInProductCart = [...filteredList]
    this.emitItemNumber()
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

  sellMemberships(userId: string, paymentMethod: string) {
    const body = this.itemsInMembershipCart.map(membership => {
      return {
        typeId: membership.id,
        startDate: membership.startDate,
        paymentMethod: paymentMethod
      }
    })
    this.http.post(`http://3.68.194.175:8080/management/api/membership/sell/${userId}`, body).subscribe({
      next: () => {
        this.itemsInMembershipCart = []
        this.emitItemNumber()
      }
    })

  }

  sellProducts(userId: string, paymentMethod: string) {
    const body = this.itemsInProductCart.map(product => {
      return {
        typeId: product.id,
        quantity: product.quantity,
        paymentMethod: paymentMethod
      }
    })
    this.http.post(`http://3.68.194.175:8080/management/api/product/sell/${userId}`, body).subscribe({
      next: () => {
        this.itemsInProductCart = []
        this.emitItemNumber()
      }
    })
  }
}
