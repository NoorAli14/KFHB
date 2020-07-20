import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-config-sidebar",
    templateUrl: "./config-sidebar.component.html",
    styleUrls: ["./config-sidebar.component.scss"],
})
export class ConfigSidebarComponent implements OnInit {
    active: string='role-module';
    constructor(private router: Router) {}

    ngOnInit(): void {}
    setActive(route) {
        this.active = route;
        this.router.navigateByUrl(`/ent/config/${route}`);
    }
}
