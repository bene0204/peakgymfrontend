import {Component, OnInit} from "@angular/core";
import {UserEntity} from "../../shared/models/UserEntity";
import {AuthService} from "../../shared/service/AuthService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "user-profile.component.html",
  styleUrls: ["user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit{
  user!: UserEntity | null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.authService.user.subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  get getYears() {
    let birthDate = new Date(this.user!.birthDate);
    let today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || today.getDate() < birthDate.getDate()) {
      years -= 1;
    }
    return years;
  }

  navigateToMemberships() {
    this.router.navigate(['memberships'], {relativeTo: this.route})
  }
}
