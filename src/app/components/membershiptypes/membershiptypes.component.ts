import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {finalize} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MembershiptypeEntity} from "../../shared/models/MembershiptypeEntity";
import {DatePickerDialogComponent} from "../dialog/date-picker-dialog/date-picker-dialog.component";
import {CartService, MembershipCartItem} from "../../shared/service/CartService";
import {MembershipService} from "../../shared/service/MembershipService";
import {ConfirmDialogComponent} from "../dialog/confirm-dialog/confirm-dialog.component";
import {MembershipFormComponent} from "../membership-form/membership-form.component";

@Component({
  selector: "app-membershiptypes",
  templateUrl: "membershiptypes.component.html",
  styleUrls: ["membershiptypes.component.scss"]
})
export class MembershiptypesComponent implements OnInit{
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Input() isSellingMode = false;
  @Input() isManagementPage = false;

  pickerDialogRef!: MatDialogRef<DatePickerDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  membershipDialogRef!: MatDialogRef<MembershipFormComponent>
  membershipTypes!: MatTableDataSource<MembershiptypeEntity>;
  isTableLoading = false

  columnsToDisplay = ["name", "days", "occasion", "price"];



  constructor(private membershipService: MembershipService, private cart: CartService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initDataSource();
  }

  initDataSource() {
    this.sort.active = "price"
    this.sort.direction = "asc"
    this.isTableLoading = true;
    if(this.isManagementPage) {
      this.columnsToDisplay = [...this.columnsToDisplay, "edit", "delete"];
    }
    this.getMembershipTypes();
  }

  getMembershipTypes() {
    this.membershipService.getMembershipTypes()
      .pipe(finalize(() => this.isTableLoading = false))
      .subscribe({
        next: list => {
          this.membershipTypes = new MatTableDataSource<MembershiptypeEntity>(list)
          this.membershipTypes.sort = this.sort;
        }
      })
  }

  addToCart(membershipType: MembershiptypeEntity) {
    if (this.isSellingMode) {
      this.pickerDialogRef = this.dialog.open(DatePickerDialogComponent);
      this.pickerDialogRef.afterClosed()
        .subscribe((date) => {
          if(date) {
            const cartItem: MembershipCartItem = {
              id: membershipType.membershipTypeId!,
              name: membershipType.name,
              startDate: new Date(date),
              price: membershipType.price
            }
            this.cart.addToMemberhipCart(cartItem);
          }
      })
    }
  }

  editMembership(membership: MembershiptypeEntity) {
    this.membershipDialogRef = this.dialog.open(MembershipFormComponent, {data: membership});
    this.membershipDialogRef.afterClosed().subscribe(() => {
      this.getMembershipTypes();
    })
  }

  deleteMembership(id: string) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent);
    this.confirmDialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.membershipService.deleteMembership(id).subscribe({
          next: () => {
            this.getMembershipTypes();
          }
        })
      }
    })

  }
}
