import {Component, ViewChild} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductTypesComponent} from "../product-types/product-types.component";
import {MembershiptypesComponent} from "../membershiptypes/membershiptypes.component";

@Component({
  selector: "app-product-management",
  templateUrl: "product-management.component.html",
  styleUrls: ["product-management.component.scss"]
})
export class ProductManagementComponent {

  dialogRef!: MatDialogRef<any>;
  @ViewChild(ProductTypesComponent) types!: MembershiptypesComponent;

  constructor(public dialog: MatDialog) {
  }

  newProduct() {

  }
}
