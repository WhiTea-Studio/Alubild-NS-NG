import { NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { ItemsComponent } from "../../item/items.component";
import { MainTabsRoutingModule } from "./main-tabs-routing.module";
import { MenuTabsComponent } from "./menu-tabs/menu-tabs.component";
import { SharedModule } from "../../shared/shared.module";
import {OrderCreatingComponent} from "../order-creating/order-creating.component";
import { ReactiveFormsModule } from '@angular/forms';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { OrderItemCreatingComponent } from '../order-item-creating/order-item-creating.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { OrderService } from '../../_services/order.service';
import { OrdersResolver } from '../../_resolvers/get-orders.resolver';
import { CalendarStyleService } from '../../main/calendar/calendar-style';

@NgModule({
    declarations: [
        MenuTabsComponent,
        ItemsComponent,
        OrderCreatingComponent,
        OrderItemCreatingComponent,
        CalendarComponent
    ],
    imports: [
        NativeScriptCommonModule,
        MainTabsRoutingModule,
        SharedModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        TNSCheckBoxModule
    ],
    providers: [
        OrderService,
        CalendarStyleService,
        OrdersResolver
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MainTabsModule {}
