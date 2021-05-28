import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../_models/order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
  moduleId: module.id,
})
export class ViewOrderComponent implements OnInit {
    public order: Order;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
        this.route.data.subscribe( data => {
        this.order = data['order'];
        if(this.order.schedulingDate !== null && this.order.schedulingDate !== undefined)
            this.order.schedulingDate = new Date(this.order.schedulingDate);
    });
  }

  back(){
    this.router.navigate(['/main/tabs']);
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
