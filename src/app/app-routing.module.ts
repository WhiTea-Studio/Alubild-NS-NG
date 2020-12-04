import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { AuthComponent } from "./auth/auth/auth.component";

const routes: Routes = [
    { path: "", component: AuthComponent},
    {
        path: 'main',
        loadChildren: () => import('../app/tabs/main-tabs.module').then(m => m.MainTabsModule)
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
