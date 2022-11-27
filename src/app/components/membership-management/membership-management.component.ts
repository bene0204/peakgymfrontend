import {Component, ViewChild} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MembershipFormComponent} from "../membership-form/membership-form.component";
import {MembershiptypesComponent} from "../membershiptypes/membershiptypes.component";

@Component({
  selector: "app-membership-management",
  templateUrl: "membership-management.component.html",
  styleUrls: ["membership-management.component.scss"]
})
export class MembershipManagementComponent {

  dialogRef!: MatDialogRef<MembershipFormComponent>;
  @ViewChild(MembershiptypesComponent) types!: MembershiptypesComponent;

  constructor(public dialog: MatDialog) {
  }

  newMembership() {
    this.dialogRef = this.dialog.open(MembershipFormComponent);
    this.dialogRef.afterClosed().subscribe(() => {
      this.types.getMembershipTypes();
    })
  }
}
