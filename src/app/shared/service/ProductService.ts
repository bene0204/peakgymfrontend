import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../models/ProductType";

@Injectable({providedIn: "root"})
export class ProductService{

  constructor(private http: HttpClient) {
  }

  getProductTypes(name: string){
    return this.http.get<ProductType[]>("http://localhost:8080/management/api/producttype/list", {
      params: {
        ["name"] : name,
      }
    });
  }
}
