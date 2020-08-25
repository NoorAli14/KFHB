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
        this.isView = this.permissions.find((x) => x.record_type == "view");
        this.isEdit = this.permissions.find((x) => x.record_type == "edit");
        this.isCreate = this.permissions.find((x) => x.record_type == "create");
        this.isDelete = this.permissions.find((x) => x.record_type == "delete");
        if (!this.isView) {
            this.renderer.setStyle(el, "display", "none");
        }
        if (!this.isEdit &&  this.type === "edit") {
            this.renderer.setStyle(el, "display", "none");
            return;
        }
        if (!this.isCreate &&  this.type === "create") {
            this.renderer.setStyle(el, "display", "none");
            return;
        }
        if (!this.isDelete &&  this.type === "delete") {
          this.renderer.setStyle(el, "display", "none");
      }
    }
    @HostListener("click") onClick() {
     
    }
}
