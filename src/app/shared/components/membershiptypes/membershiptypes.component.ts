import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {finalize} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MembershiptypeEntity} from "../../models/MembershiptypeEntity";
import { MembershipService } from "../../service/MembershipService";

@Component({
  selector: "app-membershiptypes",
  templateUrl: "membershiptypes.component.html",
  styleUrls: ["membershiptypes.component.scss"]
})
export class MembershiptypesComponent implements OnInit{
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Input() isSellingMode = false;


  membershipTypes!: MatTableDataSource<MembershiptypeEntity>;
  isTableLoading = false

  columnsToDisplay = ["name", "days", "occasion", "price"];

  constructor(private membershipTypeService: MembershipService) {
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

  addToCart(membershipTypeId: string) {
    if (this.isSellingMode) {
      console.log(membershipTypeId);
    }
  }
}