import {Injectable} from '@nestjs/common';
import {PrismaService} from '../modules/prisma/prisma.service';
import {User, Prisma} from '../../generated/prisma/client';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async user(params:Prisma.UserWhereUniqueInput): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: params
        });
        return user;
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async create(data:CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data:data
        });
    }
}
