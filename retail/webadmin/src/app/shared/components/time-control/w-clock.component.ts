
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';


export enum CLOCK_TYPE {
    HOURS = 1,
    MINUTES = 2
}


@Component({
    selector: 'w-clock',
    styleUrls: ['./w-clock.component.scss'],
    templateUrl: './w-clock.component.html',
    encapsulation: ViewEncapsulation.None
    
})
export class WClockComponent implements OnChanges {

    @Input() userTime: any = {};
    @Input() currentView: CLOCK_TYPE;
    @Output() viewChange = new EventEmitter<CLOCK_TYPE>();

    private STEP_DEG = 360 / 12;
    public steps = [];
    private selectedTimePart;


    ngOnChanges(): void {

        this.setupUI();
    }


    public setupUI(): void {

        this.steps = [];

        switch (this.currentView) {

            case CLOCK_TYPE.HOURS:

                for (let i = 1; i <= 12; i++) {

                    this.steps.push(i);
                    this.selectedTimePart = this.userTime.hour || 0;
                    if (this.selectedTimePart > 12) {

                        this.selectedTimePart -= 12;
                    }
                }
                break;

            case CLOCK_TYPE.MINUTES:

                for (let i = 5; i <= 55; i += 5) {
                    this.steps.push(i);
                }
                this.steps.push(0);
                this.selectedTimePart = this.userTime.minute || 0;
                break;
        }
    }

    public getPointerStyle(): any {

        let divider = 1;
        switch (this.currentView) {

            case CLOCK_TYPE.HOURS:
                divider = 12;
                break;

            case CLOCK_TYPE.MINUTES:
                divider = 60;
                break;
        }

        let degrees = 0;
        if (this.currentView === CLOCK_TYPE.HOURS) {
            degrees = Math.round(this.userTime.hour * (360 / divider)) - 180;
        } else {
            degrees = Math.round(this.userTime.minute * (360 / divider)) - 180;
        }

        const style = {
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            'transform': 'rotate(' + degrees + 'deg)'
        };

        return style;
    }

    public getTimeValueClass(step: number, index: number): string {

        let classes = 'mat-button mat-raised w-clock-deg' + (this.STEP_DEG * (index + 1));

        if (this.selectedTimePart === step) {

            classes += ' mat-primary';
        }

        return classes;
    }

    public changeTimeValue(step: number): void{

        if (this.currentView === CLOCK_TYPE.HOURS) {
            this.userTime.hour = step;

            // auto switch to minutes
            this.viewChange.emit(CLOCK_TYPE.MINUTES);
        } else {
            this.userTime.minute = step;

            // auto switch to hours
            this.viewChange.emit(CLOCK_TYPE.HOURS);
        }
    }
}
