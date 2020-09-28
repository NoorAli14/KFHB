import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { removeRandom } from '@shared/helpers/global.helper';

@Component({
    selector: "app-message-box",
    templateUrl: "./message-box.component.html",
    styles: [],
})
export class MessageBoxComponent implements OnInit {
    @Input() type: string;
    @Input() message: string;
    responseMessage: string;
    isVisible: boolean;
    constructor() {}

    ngOnChanges(changes: SimpleChanges){
        if(changes.message.currentValue!=changes.message.previousValue){
            this.isVisible=true;
            this.responseMessage=removeRandom(this.message)
        }
    }
    ngOnInit(): void {
      this.isVisible=true;
    }
    onClose() {
        this.isVisible = false;
    }
}
