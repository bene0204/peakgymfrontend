import {Component, Input, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {Membership} from "../../shared/models/Membership";
import {MembershipService} from "../../shared/service/MembershipService";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/service/AuthService";
import {MembershipStatus} from "../../shared/enums/MembershipStatus";

@Component({
  selector: 'app-user-memberships',
  templateUrl: 'user-memberships.component.html',
  styleUrls: ['user-memberships.component.scss']
})
export class UserMembershipsComponent implements OnInit{
  userId?: string;

  memberships!: MatTableDataSource<Membership>;

  columnsToDisplay = ["name", "endDate", "occasionsLeft"];

constructor(private memberhipService: MembershipService, private route: ActivatedRoute, private auth: AuthService) {
}

ngOnInit() {
  this.init();

}

init() {
  let authSub = this.auth.user.subscribe({
    next: (user) => {
      if (user) {
        this.userId = user.userId;
      }
    }
  })

  this.route.params.subscribe({
    next: (params) => {
      if (params['userId']) {
        authSub.unsubscribe();
        this.userId = params['userId'];
      }
    }
  })

  this.memberhipService.getActiveMembershipsByOwner(this.userId!).subscribe({
    next: list => {
      this.memberships = new MatTableDataSource<Membership>(list)
    }
  })
}

getAllMembershipsByOwner() {
  this.memberhipService.getAllMembershipsByOwner(this.userId!).subscribe({
    next: list => {
      this.memberships = new MatTableDataSource<Membership>(list);
    }
  })
}

isActive(memberhip: Membership) {
  const endDate = new Date(memberhip.endDate)
  endDate.setHours(0);
  const todayFull = new Date();
  const today = new Date(todayFull.getFullYear(), todayFull.getMonth(), todayFull.getDate())

  if(endDate < today) return MembershipStatus.EXPIRED;
  endDate.setDate(endDate.getDate() - 2)
  if(endDate <= today) {
    return MembershipStatus.EXPIRING;
  }

  return MembershipStatus.ACTIVE;


}
}
