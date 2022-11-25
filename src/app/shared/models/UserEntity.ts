import {USER_ROLE} from "../enums/USER_ROLE";

export interface UserEntity {
  userId?: string,
  firstName: string,
  lastName: string,
  birthDate: Date,
  email: string,
  phoneNumber: string,
  balance: number,
  role: USER_ROLE
}
