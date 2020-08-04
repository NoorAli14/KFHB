import {
    Directive,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
} from "@angular/core";

@Directive({
    selector: "[appPermission]",
})
export class PermissionDirective implements OnInit {
    @Input("permissions") permissions: any;
    @Input("type") type: string;
    isCreate: string;
    isEdit: string;
    isView: string;
    isDelete: string;
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit() {
        const el = this.elRef.nativeElement;
        this.isView = this.permissions.find((x) => x.name == "view");
        this.isEdit = this.permissions.find((x) => x.name == "edit");
        this.isCreate = this.permissions.find((x) => x.name == "create");
        if (!this.isView) {
            this.renderer.setStyle(el, "display", "none");
        }
        if (!this.isEdit && this.type === "edit") {
            this.renderer.setStyle(el, "display", "none");
            return;
        }
        if (!this.isCreate && this.type === "create") {
            this.renderer.setStyle(el, "display", "none");
            return;
        }
        if (!this.isDelete && this.type === "delete") {
          this.renderer.setStyle(el, "display", "none");
      }
    }
    @HostListener("click") onClick() {
     
    }
}
