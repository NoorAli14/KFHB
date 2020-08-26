import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-config-sidebar",
    templateUrl: "./config-sidebar.component.html",
    styleUrls: ["./config-sidebar.component.scss"],
})
export class ConfigSidebarComponent implements OnInit {
    active: string='role';
    constructor(private router: Router) {}

    ngOnInit() : void {
        const url= this.router.url.split('/').pop();
        this.active=url;
    }
    setActive(route) {
        this.active = route;
        this.router.navigateByUrl(`/ent/config/${route}`);
    }
}
