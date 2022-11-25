import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Breakpoints} from "@angular/cdk/layout";
import {BreakpointService} from "./shared/service/BreakpointService";
import {UserEntity} from "./shared/models/UserEntity";
import {AuthService} from "./shared/service/AuthService";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GuestFormComponent} from "./components/guest-form/guest-form.component";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'peakgym';
  handSet = false
  user?: UserEntity | null;
  dialogRef!: MatDialogRef<GuestFormComponent>;

  @ViewChild("sideNav") sideNav?: MatSidenav;


  constructor(private breakPointService: BreakpointService, private authService: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.autoLogin()
    this.authService.user.subscribe({
      next: (user) => {
        this.user = user;
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

  autoLogin() {
    if (localStorage.getItem("jwtToken")) {
      this.authService.autoLogin().subscribe({
        next: (user) => {
          this.authService.user.next(user);
        }, error : (error) => {
          this.authService.logout();
        }
      })
    }
  }
  handleSideNav(shouldOpen: boolean) {
    if (shouldOpen) {
      this.sideNav?.open();
    } else {
      this.sideNav?.close();
    }
  }

  openGuestForm(){
    this.dialogRef = this.dialog.open(GuestFormComponent);
  }
}
