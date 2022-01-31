import {Injectable} from '@nestjs/common';
import {UserRepository} from '../../domain/aggregate/user/user.repository';
import {UserEntity} from './user.entity';
import {User} from '../../domain/aggregate/user/user.type';
import {CreateUser} from '../../domain/usecase/user/dto/create-user';
import {UpdateUser} from '../../domain/usecase/user/dto/update-user';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
    async read(userId: string): Promise<User> {
        return await UserEntity.findOne(userId);
    }

    async find(username: string): Promise<User> {
        return await UserEntity.findOne({
            where: {
                username: username,
            },
        });
    }

    async create(createUser: CreateUser): Promise<void> {
        const userEntity = new UserEntity();
        userEntity.username = createUser.username;
        userEntity.avatar = createUser.avatar;
        userEntity.password = createUser.password;
        userEntity.email = createUser.email;
        userEntity.roles = createUser.roles;
        await userEntity.save();
    }

    async update(userId: string, updateUser: UpdateUser): Promise<void> {
        await UserEntity.update(userId, {
            username: updateUser.username,
            email: updateUser.email,
            phone: updateUser.phone ? updateUser.phone : null
        })
    }
}
