export declare class OrderItemDto {
    menuItemId: string;
    qty: number;
    note?: string;
}
export declare class CreateOrderDto {
    tableNumber?: string;
    notes?: string;
    source?: string;
    items: OrderItemDto[];
}
export declare class UpdateOrderStatusDto {
    status: string;
}
