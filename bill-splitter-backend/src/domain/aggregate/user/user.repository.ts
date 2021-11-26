import {User} from "./user.type";

export abstract class UserRepository {
    abstract find(username: string): Promise<User>;

    // abstract create(user: User): Promise<void>;
}