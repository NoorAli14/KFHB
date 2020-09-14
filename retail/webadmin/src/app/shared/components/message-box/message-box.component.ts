import { Component, OnInit, Input } from "@angular/core";

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

    ngOnInit(): void {
      this.isVisible=true;
    }
    onClose() {
        this.isVisible = false;
    }
}
