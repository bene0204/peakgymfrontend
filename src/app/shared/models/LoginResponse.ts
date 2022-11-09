import {UserEntity} from "./UserEntity";

export interface LoginResponse {
  user: UserEntity,
  token: string
}
