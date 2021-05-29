import { NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";
import { ItemsComponent } from "../../item/items.component";
import { MainTabsRoutingModule } from "./main-tabs-routing.module";
import { MenuTabsComponent } from "./menu-tabs/menu-tabs.component";
import { SharedModule } from "../../shared/shared.module";

import {OrderCreatingComponent} from "../order-creating/order-creating.component";
import {ListOrdersComponent} from "../list-orders/list-orders.component";
import { ReactiveFormsModule } from '@angular/forms';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { OrderItemCreatingComponent } from '../order-item-creating/order-item-creating.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { OrderService } from '../../_services/order.service';
import { OrdersResolver } from '../../_resolvers/get-orders.resolver';
import { OrderResolver } from '../../_resolvers/get-order.resolver';
import { CalendarStyleService } from '../../main/calendar/calendar-style';
import {CategoryService} from '../_services/category.service';
import {SeriesService} from '../_services/series.service';
import {ColorService} from '../_services/color.service';
import {QualityService} from '../_services/quality.service';
import {TypologyModelService} from '../_services/typology-model.service';
import {GlassQualityService} from '../_services/glass-quality.service';
import {TabakeraService} from '../_services/tabakera.service';
import {GlassPackageService} from '../_services/glass-package.service';
import {GuideService} from '../_services/guide.service';
import {ManufacturerService} from '../_services/manufacturer.service';
import {TypologyService} from '../_services/typology.service';
import {CategoriesAllResolver} from '../_resolvers/categories-all.resolver';
import {AddOrdersPhotosComponent} from '../add-orders-photos/add-orders-photos.component';
import { NativeScriptUIListViewModule} from 'nativescript-ui-listview/angular';
import {EditOrderComponent} from '../edit-order/edit-order.component';
import {ViewOrderComponent} from '../view-order/view-order.component';
import {OrderPhotoService} from '../_services/order-photo.service';
import { UserInfoResolver } from '../../_resolvers/get-user-info.resolver';
import {OrderItemEditingComponent} from "../order-item-editing/order-item-editing.component";
import {OrderItemHelpService} from '../_services/order-item-help.service';

@NgModule({
    declarations: [
        MenuTabsComponent,
        ItemsComponent,
        OrderCreatingComponent,
        OrderItemCreatingComponent,
        CalendarComponent,
        ListOrdersComponent,
        AddOrdersPhotosComponent,
        EditOrderComponent,
        ViewOrderComponent,
        OrderItemEditingComponent
    ],
    imports: [
        NativeScriptCommonModule,
        MainTabsRoutingModule,
        SharedModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        TNSCheckBoxModule,
        NativeScriptUIListViewModule
    ],
    providers: [
        CategoryService,
        TypologyService,
        CategoriesAllResolver,
        ManufacturerService,
        TabakeraService,
        GuideService,
        GlassPackageService,
        GlassQualityService,
        TypologyModelService,
        SeriesService,
        ColorService,
        QualityService,
        OrderService,
        CalendarStyleService,
        OrdersResolver,
        OrderResolver,
        OrderPhotoService,
        UserInfoResolver,
        OrderItemHelpService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MainTabsModule {}
