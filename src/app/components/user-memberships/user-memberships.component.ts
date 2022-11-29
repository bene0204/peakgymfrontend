import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {Membership} from "../../shared/models/Membership";
import {MembershipService} from "../../shared/service/MembershipService";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/service/AuthService";
import {MembershipStatus} from "../../shared/enums/MembershipStatus";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-user-memberships',
  templateUrl: 'user-memberships.component.html',
  styleUrls: ['user-memberships.component.scss']
})
export class UserMembershipsComponent implements OnInit{
  userId?: string;

  dataSource!: MatTableDataSource<Membership>;
  memberships: Membership[] = []
  isSellingMode = false;

  columnsToDisplay = ["name", "endDate", "occasionsLeft"];




constructor(private memberhipService: MembershipService,
            private route: ActivatedRoute,
            private auth: AuthService,
            private authService: AuthService) {
}

ngOnInit() {
  this.init();
}

init() {
  this.getUserIdAndRecentMemberships()
  this.memberhipService.rerunRecentMemberships.subscribe((result) => {
    if (result) this.getRecentMembershipsByOwner()
  })
}

getRecentMembershipsByOwner() {
  this.memberhipService.getRecentMembershipsByOwner(this.userId!).subscribe({
    next: list => {
      this.memberships = list;
      this.dataSource = new MatTableDataSource<Membership>(this.memberships)
      this.memberhipService.emitRecentMemberships(this.memberships);
    }
  })
}

getAllMembershipsByOwner() {
  this.memberhipService.getAllMembershipsByOwner(this.userId!).subscribe({
    next: list => {
      this.memberships = list
      this.dataSource = new MatTableDataSource<Membership>(this.memberships);
      this.memberhipService.emitRecentMemberships(this.memberships);
    }
  })
}

getUserIdAndRecentMemberships() {
  this.route.parent!.url.subscribe(url => {
    for (const urlSegment of url) {
      if (urlSegment.path === "me") {
        this.authService.user.subscribe({
          next: (user) => {
            this.userId = user?.userId;
            return this.getRecentMembershipsByOwner();
          }
        })
      }
    }
    this.route.parent!.params.subscribe({
      next: (params) => {
        if (params["userId"]) {
          this.userId = params["userId"];
          return this.getRecentMembershipsByOwner();
        }
      }
    })
  })
}

isActive(membership: Membership) {
  return this.memberhipService.isActive(membership);
}
}
