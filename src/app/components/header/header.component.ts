import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginDialogComponent} from "../dialog/login-dialog.component";
import {AuthService} from "../../shared/service/AuthService";
import {UserEntity} from "../../shared/models/UserEntity";
import {BreakpointService} from "../../shared/service/BreakpointService";
import {Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.scss"]
})
export class HeaderComponent implements OnInit{

  dialogRef!: MatDialogRef<LoginDialogComponent>;
  isLoggedIn = false;
  user?: UserEntity | null;
  isSideNavOpen = false;
  handSet = false;
  @Output() sidenavopen = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog, private authService: AuthService, private breakPointService: BreakpointService) {
  }

  ngOnInit() {
    this.authService.user.subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
        }
      }
    })
    this.breakPointService.getDevice().subscribe({
      next: (result) => {
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.handSet = true;
        } else {
          this.handSet = false;
        }
      }
    })
  }

  handleAuth() {
    if (!this.isLoggedIn) {
      this.openLoginDialog();
    } else {
      this.logout();
    }
  }

  openLoginDialog() {
    this.dialogRef = this.dialog.open(LoginDialogComponent)
  }

  logout() {
    this.authService.user.next(null);
    this.isLoggedIn = false;
    localStorage.removeItem("jwtToken")
  }

  handleSideNav() {
    if (!this.isSideNavOpen) {
      this.sidenavopen.emit(true);
      this.isSideNavOpen = true;
    } else {
      this.sidenavopen.emit(false);
      this.isSideNavOpen = false;
    }

  }
}
