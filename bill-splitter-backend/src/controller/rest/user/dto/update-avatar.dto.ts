import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {Avatar} from '../../../../domain/aggregate/user/avatar.enum';

export class UpdateAvatarDto {
    @ApiProperty()
    @IsNotEmpty()
    avatar: Avatar
}