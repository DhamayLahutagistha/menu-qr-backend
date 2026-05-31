import { PrismaService } from '../prisma/prisma.service';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
        _count: {
            stores: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
        stores: {
            id: string;
            name: string;
            slug: string;
            isActive: boolean;
        }[];
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
