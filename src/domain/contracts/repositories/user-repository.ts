import { User } from "../../entities/user";

export abstract class UserRepository {
  abstract getById(id: User["id"]): Promise<User>;
  abstract getByEmail(email: User["email"]): Promise<User | null>;
  abstract getByUsername(username: User["username"]): Promise<User>;
  abstract update(userId: User["id"], updatedUser: Partial<User>): Promise<void>;
  abstract delete(userId: User["id"]): Promise<void>;
}