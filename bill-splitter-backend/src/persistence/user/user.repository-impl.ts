import {Injectable} from '@nestjs/common';
import {UserRepository} from '../../domain/aggregate/user/user.repository';
import {UserEntity} from './user.entity';
import {User} from '../../domain/aggregate/user/user.type';
import {CreateUser} from '../../domain/usecase/user/dto/create-user';
import {UpdateUser} from '../../domain/usecase/user/dto/update-user';
import {Avatar} from 'src/domain/aggregate/user/avatar.enum';

@Injectable()
export class UserRepositoryImpl extends UserRepository {

    public async read(userId: string): Promise<User> {
        return await UserEntity.findOne(userId);
    }

    public async find(username: string): Promise<User> {
        return await UserEntity.findOne({
            where: {
                username: username,
            },
        });
    }

    public async create(createUser: CreateUser): Promise<void> {
        const userEntity = new UserEntity();
        userEntity.username = createUser.username;
        userEntity.avatar = createUser.avatar;
        userEntity.password = createUser.password;
        userEntity.email = createUser.email;
        userEntity.roles = createUser.roles;
        await userEntity.save();
    }

    public async update(userId: string, updateUser: UpdateUser): Promise<void> {
        await UserEntity.update(userId, {
            username: updateUser.username,
            email: updateUser.email,
            phone: updateUser.phone ? updateUser.phone : null
        });
    }

    public async updateAvatar(userId: string, avatar: Avatar): Promise<void> {
        await UserEntity.update(userId, {
            avatar: avatar
        });
    }

    public async updatePassword(userId: string, password: string): Promise<void> {
        await UserEntity.update(userId, {
            password: password
        });
    }
}
