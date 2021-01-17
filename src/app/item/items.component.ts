import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "../_services/auth.service";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;

    constructor(private itemService: ItemService, private authService: AuthService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    Logout(){
        this.authService.logout();
        this.router.navigate(['/'], {clearHistory: true});
    }
}
