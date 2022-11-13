import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MembershiptypeEntity} from "../models/MembershiptypeEntity";
import {Membership} from "../models/Membership";

@Injectable({providedIn: "root"})
export class MembershipService {
  constructor(private http: HttpClient) {
  }

  getMembershipTypes() {
    return this.http.get<MembershiptypeEntity[]>("http://localhost:8080/public/api/membershiptype/list")
  }

  getRecentMembershipsByOwner(userId: string) {
    return this.http.get<Membership[]>(`http://localhost:8080/api/membership/recent/${userId}`)
  }

  getAllMembershipsByOwner(userId: string) {
    return this.http.get<Membership[]>(`http://localhost:8080/api/membership/all/${userId}`)
  }
}
