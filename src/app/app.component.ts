import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Application } from '@nativescript/core';
import Theme from '@nativescript/theme';
import { AuthService } from "./_services/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.authService.autoLogin().subscribe(success =>{
            if(success){
                this.router.navigate(['/main/tabs']);
            console.log(success);
            return;
            }
            this.router.navigate(['/']);
        });

        if(Application.android){
            try{
                Theme.setMode(Theme.Light);
            } catch(e){
                console.log("Error setting Theme to light mode", e);
            }
        }
    }
}
