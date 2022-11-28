import {UserEntity} from "./UserEntity";

export interface KeyEntity{
  key: string,
  userId?: UserEntity
}
