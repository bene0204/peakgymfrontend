import {Component, Inject, OnInit} from "@angular/core";
import {USER_ROLE} from "../../shared/enums/USER_ROLE";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/service/UserService";
import {UserEntity} from "../../shared/models/UserEntity";

@Component({
  selector: "app-guest-form",
  templateUrl: "guest-form.component.html",
  styleUrls: ["guest-form.component.scss"]
})
export class GuestFormComponent implements OnInit{

  userForm!: FormGroup;


  options = [
    {value: USER_ROLE.BASIC, viewValue: "Vendég"},
    {value: USER_ROLE.EMPLOYEE, viewValue: "Alkalmazott"},
    {value: USER_ROLE.ADMIN, viewValue: "Üzletvezető"},
  ]

  constructor(public dialogref: MatDialogRef<GuestFormComponent>,
              private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA)private data?: UserEntity) {
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      lastName: [this.data?.lastName ?? '', Validators.required],
      firstName: [this.data?.firstName ?? '', Validators.required],
      birthDate: [ this.data?.birthDate ?? '', Validators.required],
      email: [this.data?.email ?? '', [Validators.email, Validators.required]],
      phoneNumber: [this.data?.phoneNumber ?? ''],
      balance: [this.data?.balance ?? 0],
      role: [this.data?.role ?? USER_ROLE.BASIC]
    })
  }

  handleSave() {
    if(!this.data) {
      this.signUpUser();
    } else {
      this.updateUser()
    }
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value, this.data!.userId!).subscribe({
      next: (user) => {
        this.dialogref.close();
      }
    })
  }

  signUpUser(){
    this.userService.signUpUser(this.userForm.value).subscribe({
      next: (user) =>{
        this.router.navigate(["profile", user.userId]);
        this.dialogref.close();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cancel() {
    this.dialogref.close();
  }

}
