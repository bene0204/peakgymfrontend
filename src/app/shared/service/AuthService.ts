import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../models/LoginDTO";
import {LoginResponse} from "../models/LoginResponse";
import {BehaviorSubject} from "rxjs";
import {UserEntity} from "../models/UserEntity";
import {Router} from "@angular/router";


@Injectable({providedIn: "root"})
export class AuthService {

  user: BehaviorSubject<UserEntity | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject<UserEntity | null>(null);
  }

  loginUser(userLogin: LoginDTO) {
    return this.http.post<LoginResponse>("http://3.68.194.175:8080/public/api/login", userLogin)
  }

  autoLogin() {
    return this.http.get<UserEntity>("http://3.68.194.175:8080/public/api/autologin")
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("jwtToken")
    this.router.navigate([""]);
  }
}
