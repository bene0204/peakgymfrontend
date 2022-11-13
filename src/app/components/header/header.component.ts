import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginDialogComponent} from "../dialog/login-dialog.component";
import {AuthService} from "../../shared/service/AuthService";
import {UserEntity} from "../../shared/models/UserEntity";
import {BreakpointService} from "../../shared/service/BreakpointService";
import {Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {USER_ROLE} from "../../shared/enums/USER_ROLE";

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

  ManagementRoles = [USER_ROLE.EMPLOYEE, USER_ROLE.ADMIN];

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private breakPointService: BreakpointService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.user.subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.isLoggedIn = true;
        } else {
          this.user = null;
          this.isLoggedIn = false;
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
      this.authService.logout();
    }
  }

  openLoginDialog() {
    this.dialogRef = this.dialog.open(LoginDialogComponent)
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
