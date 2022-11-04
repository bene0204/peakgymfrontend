import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MembershiptypeEntity} from "../models/MembershiptypeEntity";

@Injectable({providedIn: "root"})
export class MembershipTypeService {
  constructor(private http: HttpClient) {
  }

  getMembershipTypes() {
    return this.http.get<MembershiptypeEntity[]>("http://localhost:8080/api/membershiptype/list")
  }
}
