import {Component, OnInit} from "@angular/core";
import {UserEntity} from "../../shared/models/UserEntity";
import {AuthService} from "../../shared/service/AuthService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/service/UserService";

@Component({
  selector: "app-user-profile",
  templateUrl: "user-profile.component.html",
  styleUrls: ["user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit{
  user!: UserEntity | null;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.router.navigate(["memberships"], {relativeTo: this.route})

    this.getUserProfile()
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

  getUserProfile() {
    this.route.url.subscribe(url => {
      for (const urlSegment of url) {
        if (urlSegment.path === "me") {
          this.authService.user.subscribe({
            next: (user) => {
              return this.user = user;
            }
          })
        }
      }
      this.route.params.subscribe({
        next: (params) => {
          if (params["userId"]) {
            this.getUserById(params["userId"]);
          }
        }
      })
    })
  }

  getUserById(userId: string) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        return this.user = user;
      }
    })
  }

  navigateToMemberships() {
    this.router.navigate(['memberships'], {relativeTo: this.route})
  }
}
