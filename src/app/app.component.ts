import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
    }
}
