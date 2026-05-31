export declare class CreateStoreDto {
    name: string;
    slug: string;
    description?: string;
    address?: string;
    phone?: string;
}
export declare class UpdateStoreDto {
    name?: string;
    description?: string;
    address?: string;
    phone?: string;
    isActive?: boolean;
}
export declare class UpdatePaymentDto {
    qrisImageUrl?: string;
    bankName?: string;
    bankAccount?: string;
    bankHolder?: string;
}
