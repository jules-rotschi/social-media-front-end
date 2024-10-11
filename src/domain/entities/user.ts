export class User {
  id?: number;
  username?: string;
  email?: string;
  fullName?: string;
  password?: string;
  passwordConfirmation?: string;
  description?: string;
  picture?: string;
}

export type UserUID = User["email"] | User["username"];