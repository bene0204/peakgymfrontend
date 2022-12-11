import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../models/ProductType";

@Injectable({providedIn: "root"})
export class ProductService{

  constructor(private http: HttpClient) {
  }

  getProductTypes(name: string){
    return this.http.get<ProductType[]>("http://3.68.194.175:8080/management/api/producttype/list", {
      params: {
        ["name"] : name,
      }
    });
  }

  saveProduct(body: ProductType) {
    return this.http.post<ProductType>("http://3.68.194.175:8080/admin/api/producttype/add", body);
  }

  updateProduct(typeId: string, body: ProductType) {
    return this.http.patch<ProductType>(`http://3.68.194.175:8080/admin/api/producttype/update/${typeId}`, body);
  }

  deleteProduct(typeId: string) {
    return this.http.delete(`http://3.68.194.175:8080/admin/api/producttype/delete/${typeId}`);
  }
}
