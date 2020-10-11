import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { removeRandom } from '@shared/helpers/global.helper';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styles: [],
})
export class MessageBoxComponent implements OnInit, OnChanges {
    @Input() type: string;
    @Input() message: string;
    responseMessage: string;
    isVisible: boolean;
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void{
        if (changes.message?.currentValue !== changes.message?.previousValue){
            this.isVisible = true;
            this.responseMessage = removeRandom(this.message);
        }
    }
    ngOnInit(): void {
      this.isVisible = true;
    }
    onClose(): void {
        this.isVisible = false;
    }
}
