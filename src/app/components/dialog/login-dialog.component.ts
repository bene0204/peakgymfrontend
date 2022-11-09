import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/service/AuthService";
import {LoginDTO} from "../../shared/models/LoginDTO";

@Component({
  selector: "app-login-dialog",
  templateUrl: "login-dialog.component.html",
  styleUrls: ["login-dialog.component.scss"]
})
export class LoginDialogComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(public dialogref: MatDialogRef<LoginDialogComponent>,
              private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    let userLogin: LoginDTO= {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.loginUser(userLogin).subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken', response.token);
        this.authService.user.next(response.user);
        this.dialogref.close();
      },
      error: (error) => {
        console.log(error)
        this.loginForm.reset();
      }
      }
    )

  }
}
