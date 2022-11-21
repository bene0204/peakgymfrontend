import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {finalize} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MembershiptypeEntity} from "../../models/MembershiptypeEntity";
import { MembershipService } from "../../service/MembershipService";
import {MembershipCartItem, CartService} from "../../service/CartService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DatePickerDialogComponent} from "../../../components/dialog/date-picker-dialog/date-picker-dialog.component";

@Component({
  selector: "app-membershiptypes",
  templateUrl: "membershiptypes.component.html",
  styleUrls: ["membershiptypes.component.scss"]
})
export class MembershiptypesComponent implements OnInit{
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @Input() isSellingMode = false;

  dialogRef!: MatDialogRef<DatePickerDialogComponent>;
  membershipTypes!: MatTableDataSource<MembershiptypeEntity>;
  isTableLoading = false

  columnsToDisplay = ["name", "days", "occasion", "price"];

  constructor(private membershipTypeService: MembershipService, private cart: CartService,
              public dialog: MatDialog) {
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

  addToCart(membershipType: MembershiptypeEntity) {
    if (this.isSellingMode) {
      this.dialogRef = this.dialog.open(DatePickerDialogComponent);
      this.dialogRef.afterClosed()
        .subscribe((date) => {
          if(date) {
            const cartItem: MembershipCartItem = {
              id: membershipType.membershipTypeId,
              name: membershipType.name,
              startDate: new Date(date),
              price: membershipType.price
            }
            this.cart.addToMemberhipCart(cartItem);
            console.log(this.cart.getCartItems());
          }
      })
    }
  }
}
