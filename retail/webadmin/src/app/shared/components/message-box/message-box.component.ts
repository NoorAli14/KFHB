import { Component, OnInit, Input, SimpleChanges } from "@angular/core";

@Component({
    selector: "app-message-box",
    templateUrl: "./message-box.component.html",
    styles: [],
})
export class MessageBoxComponent implements OnInit {
    @Input() type: string;
    @Input() message: string;
    isVisible: boolean;
    constructor() {}

    ngOnChanges(changes: SimpleChanges){
        if(changes.message.currentValue!=changes.message.previousValue){
            this.isVisible=true;
        }
    }
    ngOnInit(): void {
      this.isVisible=true;
    }
    onClose() {
        this.isVisible = false;
    }
}
