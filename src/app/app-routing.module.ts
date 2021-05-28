import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { AuthComponent } from "./auth/auth/auth.component";
import { EditOrderComponent } from "./main/edit-order/edit-order.component";
import { ViewOrderComponent } from "./main/view-order/view-order.component";
import { OrderResolver } from "./_resolvers/get-order.resolver";

const routes: Routes = [
    { path: "", component: AuthComponent},
    {path: 'edit-order/:id', component: EditOrderComponent, resolve: {order: OrderResolver}},
    {path: 'view-order/:id', component: ViewOrderComponent, resolve: {order: OrderResolver}},
    // {path: ':mode',
    {
        path: 'main',
        loadChildren: () => import('./main/tabs/main-tabs.module').then(m => m.MainTabsModule)
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    schemas:[NO_ERRORS_SCHEMA]
})
export class AppRoutingModule { }
