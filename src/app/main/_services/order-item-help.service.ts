import { Injectable } from '@angular/core';
import {OrderItem} from '../../_models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderItemHelpService {
    private orderItem: OrderItem = null;

    constructor() { }

    setOrderItem(value: OrderItem){
        this.orderItem = value;
    }

    getOrderItem(){
        return this.orderItem;
    }

}
