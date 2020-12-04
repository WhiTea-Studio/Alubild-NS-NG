import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import {AuthComponent} from "../app/auth/auth/auth.component";
import {SharedModule} from "../app/shared/shared.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        ItemDetailComponent,
        AuthComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
