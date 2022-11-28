import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {KeyEntity} from "../models/KeyEntity";

@Injectable({providedIn: "root"})
export class KeyService {
  constructor(private http: HttpClient) {
  }

  getKeys() {
    return this.http.get<KeyEntity[]>("http://localhost:8080/management/api/keys")
  }

  checkInUser(key: string, checkInDTO: {membershipId: string, userId: string}) {
    return this.http.patch<KeyEntity[]>(`http://localhost:8080/management/api/keys/checkin/${key}`, checkInDTO);
  }
}
