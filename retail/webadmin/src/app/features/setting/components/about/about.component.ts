import { getName } from "@shared/helpers/global.helper";
import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { NATIONALITY_LIST } from "@shared/constants/app.constants";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AboutComponent implements OnInit {
    @Input() user: any;
    @Input() nationalities: any[];

    nationalityList: any[] = NATIONALITY_LIST;
    constructor() {}

    ngOnInit(): void {
    }
    getNationality(id) {
        return getName(id, "nationality", this.nationalities);
    }
}
