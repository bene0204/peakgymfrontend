import {Component, ViewChild} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductTypesComponent} from "../product-types/product-types.component";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: "app-product-management",
  templateUrl: "product-management.component.html",
  styleUrls: ["product-management.component.scss"]
})
export class ProductManagementComponent {

  dialogRef!: MatDialogRef<ProductFormComponent>;
  @ViewChild(ProductTypesComponent) types!: ProductTypesComponent;

  constructor(public dialog: MatDialog) {
  }

  newProduct() {
    this.dialogRef = this.dialog.open(ProductFormComponent);
    this.dialogRef.afterClosed().subscribe(() => {
      this.types.getProducts("");
    })
  }
}
