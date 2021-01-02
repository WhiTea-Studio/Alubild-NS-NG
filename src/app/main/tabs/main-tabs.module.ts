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

@NgModule({
    declarations: [
        MenuTabsComponent, 
        ItemsComponent,
        OrderCreatingComponent,
        OrderItemCreatingComponent
    ],
    imports: [
        NativeScriptCommonModule, 
        MainTabsRoutingModule, 
        SharedModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        TNSCheckBoxModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MainTabsModule {}
