import { User } from "../../entities/user";

export interface SignupDto {
  email: User["email"];
  username: User["username"];
  fullName: User["fullName"];
  password: User["password"];
  passwordConfirmation: User["password"]
}