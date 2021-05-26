import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@nativescript/core/ui/layouts/flexbox-layout';
import { OrderService } from '../../_services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
  moduleId: module.id,
})
export class ListOrdersComponent implements OnInit {
    orders: Order[];

  constructor(private orderService: OrderService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
        this.orders = data['orders'];
      });
      console.log(this.orders);
  }

  edit(id: any){
    console.log("Ide na izmenu naloga br: "+id);
  }

  delete(id: any){

    if (this.orderService.delete(id)) {
        console.log("Ide na brisanje naloga br: "+id);
    } else {
        console.log("Nije uspelo brisanje naloga br: "+id);
    }
  }
}
