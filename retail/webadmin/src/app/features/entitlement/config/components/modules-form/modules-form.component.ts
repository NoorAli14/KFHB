import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Modules } from "../../../models/modules.model";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-modules-form",
    templateUrl: "./modules-form.component.html",
    styleUrls: ["./modules-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ModulesFormComponent implements OnInit {
    modulesForm: FormGroup;

    modules: Modules[];
    constructor(
        public matDialogRef: MatDialogRef<ModulesFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.modulesForm = new FormGroup({
            id: new FormControl(this.data.module.id),
            name: new FormControl(this.data.module.name, [Validators.required]),
            status: new FormControl(this.data.module.status, [
                Validators.required,
            ]),
            parent: new FormControl(this.data.module.parent, [
                Validators.required,
            ]),
            permissions: new FormControl(this.data.module.parent, [
                Validators.required,
            ]),
        });
        this.modules = this.data.modules;
        this.modules = [
            ...this.modules,
            {
                id: Math.random().toString(),
                name: "Self",
                status: "active",
                parent: "1",
                permissions:[]
            },
        ];
    }
    onSubmit() {
        this.matDialogRef.close({ data: this.modulesForm.value });
    }
}
