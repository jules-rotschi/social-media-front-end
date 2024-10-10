import { User, UserUID } from "../../../entities/user";

export interface LoginUserInputDTO {
  uid: UserUID;
  password: User["password"];
}