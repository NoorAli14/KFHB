import {
    Directive,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appPermission]',
})
export class PermissionDirective implements OnInit {
    @Input('permissions') permissions: any;

    @Input('type') type: string;
 
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(): void {
        const el = this.elRef.nativeElement;
        if (!this.permissions) {return; }
        const isView = this.permissions.find((x) => x.record_type === 'view');
        const isEdit = this.permissions.find((x) => x.record_type === 'edit');
        const isCreate = this.permissions.find((x) => x.record_type === 'create');
        const isDelete = this.permissions.find((x) => x.record_type === 'delete');
        if (!isView) {
            this.renderer.setStyle(el, 'display', 'none');
        }
        if (!isEdit &&  this.type === 'edit') {
            this.renderer.setStyle(el, 'display', 'none');
            return;
        }
        if (!isCreate &&  this.type === 'create') {
            this.renderer.setStyle(el, 'display', 'none');
            return;
        }
        if (!isDelete &&  this.type === 'delete') {
          this.renderer.setStyle(el, 'display', 'none');
      }
    }
    
}
