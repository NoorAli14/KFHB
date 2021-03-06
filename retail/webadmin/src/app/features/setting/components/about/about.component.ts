import { getName } from '@shared/helpers/global.helper';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AboutComponent implements OnInit {
    @Input() user: any;
    @Input() nationalities: any[] = [];

    constructor() {}

    ngOnInit(): void {
    }
    getNationality(id): void {
        return getName(id, 'nationality', this.nationalities);
    }
}
