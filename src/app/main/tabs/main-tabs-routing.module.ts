import { NgModule} from "@angular/core";
import { Routes } from "@angular/router";
import {NativeScriptRouterModule} from "@nativescript/angular";
import{MenuTabsComponent} from "./menu-tabs/menu-tabs.component";
import{ItemsComponent} from "../../item/items.component";
import { OrderCreatingComponent } from '../order-creating/order-creating.component';
import { CalendarComponent } from "../calendar/calendar.component";
import { OrdersResolver } from "../../_resolvers/get-orders.resolver";
import { ListOrdersComponent } from "../list-orders/list-orders.component";


const routes: Routes = [
    {path: 'tabs',
            component: MenuTabsComponent,
            children:[
                {path: 'orders', component: ListOrdersComponent, outlet: 'orders', resolve: {orders: OrdersResolver}},
                {path: 'new-order', component: OrderCreatingComponent, outlet: 'newOrder'},
                {path: 'items3', component: ItemsComponent, outlet: 'items3'}
            ]},
    // {path: ':mode',
    //     // component: ChallengeEditComponent
    //     loadChildren: () => import('./challenge-edit/challenge-edit.module').then(m => m.ChallengeEditModule)
    // },
    {path: '', redirectTo: '/main/tabs', pathMatch: 'full'}
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MainTabsRoutingModule {

}
