import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserEntity} from "../models/UserEntity";

@Injectable({providedIn: "root"})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getUserById(userId: string) {
    return this.httpClient.get<UserEntity>(`http://localhost:8080/management/api/user/${userId}`)
  }

  findUsersByFirstAndLastName(firstName: string, lastName: string){
    return this.httpClient.get<UserEntity[]>("http://localhost:8080/management/api/user/search", {
      params: {
        ["firstName"]: firstName,
        ["lastName"]: lastName
      }
    })
  }

}
