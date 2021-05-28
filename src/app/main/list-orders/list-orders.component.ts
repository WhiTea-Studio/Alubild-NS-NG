import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { OrderService } from '../../_services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
  moduleId: module.id,
})
export class ListOrdersComponent implements OnInit {
    orders: Order[] = [];

  constructor(private orderService: OrderService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
        this.orders = data['orders'];
        this.orders.forEach(order => {
            order.dateCreated = new Date(order.dateCreated);
        });
      });
  }

  edit(id: any){
    console.log("Ide na izmenu naloga br: "+id);
  }

  delete(id: any){
    this.orderService.delete(id).subscribe(() => {
        this.orders = this.orders.filter(x => x.id !== id);
        console.log('Broj>>>>>> ' + this.orders.filter(x => x.id !== id).length);
    }, error => {
        console.log("Nije uspelo brisanje naloga br: "+id + " " + error.message);
    });
    // if (this.orderService.delete(id)) {
    //     console.log("Ide na brisanje naloga br: "+id);

    // } else {
    //     console.log("Nije uspelo brisanje naloga br: "+id);
    // }
  }

  getDate(date: Date){
      if( date.getDate()/10 < 1) {
          if ((date.getMonth()+1)/10 < 1 ) return "0"+date.getDate() + ".0"+ (date.getMonth()+1) + "." + date.getFullYear();
          else return "0"+date.getDate() + "."+ (date.getMonth()+1) + "." + date.getFullYear();
      }else{
        if ((date.getMonth()+1)/10 < 1 ) return date.getDate() + ".0"+ (date.getMonth()+1) + "." + date.getFullYear();
        else return date.getDate() + "."+ (date.getMonth()+1) + "." + date.getFullYear();
      }
  }
}
