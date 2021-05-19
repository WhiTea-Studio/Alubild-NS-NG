import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from '@nativescript/core';
import * as calendarModule from "nativescript-ui-calendar";
import { Pagination } from '../../_models/pagination';
import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order';
import { CalendarStyleService } from './calendar-style';

export class CustomEvent extends calendarModule.CalendarEvent {
    id: number;

    constructor(id: number, title: string,  startDate: Date, endDate: Date, isAllDay?: boolean, eventColor?: Color) {
        super(title, startDate, endDate, isAllDay, eventColor);
        this.id = id;
    }
}

@Component({
  selector: 'ns-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  moduleId: module.id
})
export class CalendarComponent implements OnInit {
    calendarEvents = [];
    orders: Order[];
    orderParams: any = {};
    pagination: Pagination;
     _monthViewStyle: any;
     _monthNamesViewStyle: any;
     _weekViewStyle: any;
     _dayViewStyle: any;
     _yearViewStyle: any;

    constructor(private route: ActivatedRoute, private orderService: OrderService, private calendarService: CalendarStyleService) { }

    ngOnInit() {
        this.setCalendarStyle();
        this.route.data.subscribe( data => {
            this.orders = data['orders'];
            // console.log(this.orders);
        });

        let events = [];
        let event;
        let startDate = new Date();
        let endDate = new Date();
        let colors = [new Color("#48a648"),new Color("#e4572e")];
          this.orders.forEach(order => {
            startDate.setDate(new Date(order.dateCreated).getDate());
             endDate.setDate(new Date(order.dateCreated).getDate());
                if(order.service){
                    event = new CustomEvent( order.id, order.clientsName + ' ' + order.clientsSurname, startDate, endDate, true, colors[1]);
                }else{
                    event = new CustomEvent( order.id, order.clientsName + ' ' + order.clientsSurname, startDate, endDate, true, colors[0]);
                }
                events.push(event);
            }
        );
        this.calendarEvents = events;
        // console.log(this.calendarEvents);

    }

    setCalendarStyle(){
        this._monthViewStyle = this.calendarService.getMonthViewStyle();
        // this._monthNamesViewStyle = this.calendarService.getMonthNamesViewStyle();
        // this._weekViewStyle = this.calendarService.getWeekViewStyle();
        // this._dayViewStyle = this.calendarService.getDayViewStyle();
        this._yearViewStyle = this.calendarService.getYearViewStyle();
    }
    onDateSelected(args) {
        console.log("onDateSelected: " + args.date);
    }

    onDateDeselected(args) {
        console.log("onDateDeselected: " + args.date);
    }

    onNavigatedToDate(args) {
        console.log("onNavigatedToDate: " + args.date);
    }

    onNavigatingToDateStarted(args) {
        console.log("onNavigatingToDateStarted: " + args.date);
    }

    onViewModeChanged(args) {
        console.log("onViewModeChanged: " + args.newValue);
    }
    onInlineEventSelected(args) {
        console.log("onInlineEventSelected " + args.eventData.id);
    }
}
