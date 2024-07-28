import { User } from "../../../entities/user";

export interface SignupUserInputDTO {
  email: User["email"];
  username: User["username"];
  fullName: User["fullName"];
  password: User["password"];
  passwordConfirmation: User["password"];
}