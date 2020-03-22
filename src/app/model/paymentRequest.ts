export interface PaymentCreateRequest {
    amount: number;
    date:Date;
    sufficientBalance:boolean;
}