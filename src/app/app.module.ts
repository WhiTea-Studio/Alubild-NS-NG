import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import {SharedModule} from "../app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import {AuthComponent} from "../app/auth/auth/auth.component";
import {RegisterComponent} from "../app/auth/register/register.component";
import {AuthService} from "../app/_services/auth.service";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        ItemDetailComponent,
        AuthComponent,
        RegisterComponent
    ],
    providers: [
        AuthService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
