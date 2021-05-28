import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "../_services/auth.service";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html",
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
    item: Item;

    constructor(private itemService: ItemService, private authService: AuthService, private router: RouterExtensions) { }

    ngOnInit(): void { }

    Logout(){
        this.authService.logout();
        this.router.navigate(['/'], {clearHistory: true});
    }
}
