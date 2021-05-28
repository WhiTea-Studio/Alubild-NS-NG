import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { User } from "../_models/user";
import { AuthService } from "../_services/auth.service";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html",
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
    user: User;

    constructor(private route: ActivatedRoute, private router: RouterExtensions, private authService: AuthService) { }

    ngOnInit(): void {
        this.route.data.subscribe( data => {
        this.user = data['user'];
      });}

    Logout(){
        this.authService.logout();
        this.router.navigate(['/'], {clearHistory: true});
    }
}
