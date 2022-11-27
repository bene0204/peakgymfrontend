import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../shared/service/ProductService";
import {ProductType} from "../../shared/models/ProductType";

@Component({
  selector: "app-product-form",
  templateUrl: "product-form.component.html",
  styleUrls: ["product-form.component.scss"]
})
export class ProductFormComponent implements OnInit{

  productForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductFormComponent>,
              private fb: FormBuilder,
              private productService: ProductService,
              @Inject(MAT_DIALOG_DATA)private data?: ProductType) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [this.data?.name ?? '', Validators.required],
      quantity: [this.data?.quantity ?? 0, Validators.required],
      price: [this.data?.price ?? null, Validators.required]
    })
  }

  handleSave() {
    if(!this.data) {
      this.saveProduct();
    } else {
      this.updateProduct(this.data.productTypeId!);
    }
  }

  saveProduct() {
    this.productService.saveProduct(this.productForm.value).subscribe(() => {
      this.dialogRef.close();
    })
  }

  updateProduct(id: string) {
    this.productService.updateProduct(id, this.productForm.value).subscribe(() => {
      this.dialogRef.close()
    })
  }
}
