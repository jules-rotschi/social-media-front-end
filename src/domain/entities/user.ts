export class User {
  id?: number;
  username: string;
  email: string;
  fullName: string;
  password: string;
  passwordConfirmation?: string;
  description?: string;
  picture?: string;

  constructor(
    username: string,
    email: string,
    fullName: string,
    password: string,
  ) {
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.password = password;
  }
}

export type UserUID = User["email"] | User["username"];