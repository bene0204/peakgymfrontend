import {Injectable, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MembershiptypeEntity} from "../models/MembershiptypeEntity";
import {Membership} from "../models/Membership";
import {MembershipStatus} from "../enums/MembershipStatus";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class MembershipService {
  memberships: Membership[] = [];
  recentMemberships = new BehaviorSubject<Membership[]>(this.memberships)
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

  saveMembership(body: MembershiptypeEntity) {
    return this.http.post<MembershiptypeEntity>("http://localhost:8080/admin/api/membershiptype/add", body)
  }

  updateMembership(id: string, body: MembershiptypeEntity) {
    return this.http.patch<MembershiptypeEntity>(`http://localhost:8080/admin/api/membershiptype/modify/${id}`, body)
  }

  deleteMembership(membershipId: string){
    return this.http.delete(`http://localhost:8080/admin/api/membershiptype/delete/${membershipId}`)
  }

  isActive(membership: Membership) {
    const endDate = new Date(membership.endDate)
    const startDate = new Date(membership.startDate)
    startDate.setHours(0);
    endDate.setHours(0);
    const todayFull = new Date();
    const today = new Date(todayFull.getFullYear(), todayFull.getMonth(), todayFull.getDate())

    if(endDate < today || membership.occasionsLeft || membership.occasionsLeft === 0) return MembershipStatus.EXPIRED;
    endDate.setDate(endDate.getDate() - 2)
    if(endDate <= today) {
      return MembershipStatus.EXPIRING;
    }
    if(startDate > today) {
      return MembershipStatus.NOT_YET_ACTIVE;
    }
    return MembershipStatus.ACTIVE;
  }

  emitRecentMemberships(memberships: Membership[]){
    this.memberships = memberships
    this.recentMemberships.next(this.memberships);
  }
}
