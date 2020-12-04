import { NgModule} from "@angular/core";
import { Routes } from "@angular/router";
import {NativeScriptRouterModule} from "@nativescript/angular";
import{MenuTabsComponent} from "./menu-tabs/menu-tabs.component";
import{ItemsComponent} from "../item/items.component";


const routes: Routes = [
    {path: 'tabs',
            component: MenuTabsComponent,
            children:[
                {path: 'items', component: ItemsComponent, outlet: 'items'},
                {path: 'items2', component: ItemsComponent, outlet: 'items2'},
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
