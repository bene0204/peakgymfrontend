import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MembershipService} from "../../shared/service/MembershipService";
import {MembershiptypeEntity} from "../../shared/models/MembershiptypeEntity";

@Component({
  selector: "app-membership-form",
  templateUrl: "membership-form.component.html",
  styleUrls: ["membership-form.component.scss"]
})
export class MembershipFormComponent implements OnInit{

  membershipForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<MembershipFormComponent>,
              private fb: FormBuilder,
              private membershipService: MembershipService,
              @Inject(MAT_DIALOG_DATA)private data?: MembershiptypeEntity) {
  }

  ngOnInit() {
    this.membershipForm = this.fb.group({
      name: [this.data?.name ?? '', Validators.required],
      numberOfDays: [this.data?.numberOfDays ?? null, Validators.required],
      numberOfOccasion: [this.data?.numberOfOccasion ?? null],
      price: [this.data?.price ?? null, Validators.required]
    })
  }

  handleSave() {
    if(!this.data) {
      this.saveMembershipType();
    } else {
      this.updateMembershipType(this.data.membershipTypeId!);
    }
  }

  saveMembershipType() {
    this.membershipService.saveMembership(this.membershipForm.value).subscribe(() => {
      this.dialogRef.close();
    })
  }

  updateMembershipType(id: string) {
    this.membershipService.updateMembership(id, this.membershipForm.value).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
