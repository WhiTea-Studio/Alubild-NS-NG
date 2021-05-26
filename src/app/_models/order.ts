import { OrderItem } from './order-item';
import { OrderPhoto } from './order-photo';

export interface Order {
    id?: number,
    clientsName: string,
    clientsSurname: string,
    clientsAdress: string,
    clientsPhoneNumber: string,
    clientsEmail?: string,
    dateCreated: Date,
    service: boolean,
    note: string,
    price?: number,
    schedulingDate?: Date,
    orderPhotos?: OrderPhoto[],
    orderItems?: OrderItem[],
    userId: number;
}
