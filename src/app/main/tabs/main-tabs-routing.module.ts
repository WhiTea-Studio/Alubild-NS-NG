import { NgModule} from "@angular/core";
import { Routes } from "@angular/router";
import {NativeScriptRouterModule} from "@nativescript/angular";
import{MenuTabsComponent} from "./menu-tabs/menu-tabs.component";
import { OrderCreatingComponent } from '../order-creating/order-creating.component';
import { OrdersResolver } from "../../_resolvers/get-orders.resolver";
import { ListOrdersComponent } from "../list-orders/list-orders.component";
import { AddOrdersPhotosComponent } from '../add-orders-photos/add-orders-photos.component';
import { ItemDetailComponent } from "../../item/item-detail.component";
import { UserInfoResolver } from "../../_resolvers/get-user-info.resolver";


const routes: Routes = [
    {path: 'tabs',
            component: MenuTabsComponent,
            children:[
                {path: 'orders', component: ListOrdersComponent, outlet: 'orders', resolve: {orders: OrdersResolver}},
                {path: 'new-order', component: OrderCreatingComponent, outlet: 'newOrder'},
                {path: 'items3', component: ItemDetailComponent, outlet: 'items3',resolve: {user: UserInfoResolver}}
            ]},
    {path: 'add-orders-photos', component: AddOrdersPhotosComponent},
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
