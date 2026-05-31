export declare class CreateMenuItemDto {
    name: string;
    description?: string;
    price: number;
    sortOrder?: number;
}
export declare class UpdateMenuItemDto {
    name?: string;
    description?: string;
    price?: number;
    isAvailable?: boolean;
    sortOrder?: number;
}
