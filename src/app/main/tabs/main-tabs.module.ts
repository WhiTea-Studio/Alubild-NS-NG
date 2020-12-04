import { NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ItemsComponent } from "../../item/items.component";
import { MainTabsRoutingModule } from "./main-tabs-routing.module";
import { MenuTabsComponent } from "./menu-tabs/menu-tabs.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [MenuTabsComponent, ItemsComponent],
    imports: [NativeScriptCommonModule, MainTabsRoutingModule, SharedModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MainTabsModule {}
