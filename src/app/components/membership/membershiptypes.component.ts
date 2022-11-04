import {Component, OnInit, ViewChild} from "@angular/core";
import {MembershiptypeEntity} from "../../shared/models/MembershiptypeEntity";
import {HttpClient} from "@angular/common/http";
import {MembershipTypeService} from "../../shared/service/MembershipTypeService";
import {finalize} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: "app-membershiptypes",
  templateUrl: "membershiptypes.component.html",
  styleUrls: ["membershiptypes.component.scss"]
})
export class MembershiptypesComponent implements OnInit{
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  membershipTypes!: MatTableDataSource<MembershiptypeEntity>;
  isTableLoading = false

  columnsToDisplay = ["name", "days", "occasion", "price"];

  constructor(private membershipTypeService: MembershipTypeService) {
  }

  ngOnInit() {
    this.initDataSource();
  }

  initDataSource() {
    this.sort.active = "price"
    this.sort.direction = "asc"
    this.isTableLoading = true;
    this.membershipTypeService.getMembershipTypes()
      .pipe(finalize(() => this.isTableLoading = false))
      .subscribe({
      next: list => {
        this.membershipTypes = new MatTableDataSource<MembershiptypeEntity>(list)
        this.membershipTypes.sort = this.sort;
      }
    })
  }
}
