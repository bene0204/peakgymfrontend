import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../models/LoginDTO";
import {LoginResponse} from "../models/LoginResponse";
import {BehaviorSubject} from "rxjs";
import {UserEntity} from "../models/UserEntity";

export interface JwtToken {
  token: string
}

@Injectable({providedIn: "root"})
export class AuthService {

  user: BehaviorSubject<UserEntity | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<UserEntity | null>(null);
  }

  loginUser(userLogin: LoginDTO) {
    return this.http.post<LoginResponse>("http://localhost:8080/public/api/login", userLogin)
  }
}
