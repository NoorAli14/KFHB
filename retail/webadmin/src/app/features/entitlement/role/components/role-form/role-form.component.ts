import { Output, EventEmitter, Injectable } from "@angular/core";
import { BaseComponent } from "@shared/components/base/base.component";
import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { Validators, FormArray, FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { fuseAnimations } from "@fuse/animations";
import { MatTableDataSource } from "@angular/material/table";
import { Permission } from "@feature/entitlement/models/config.model";
import { camelToSentenceCase } from "@shared/helpers/global.helper";

@Component({
    selector: "app-role-form",
    templateUrl: "./role-form.component.html",
    styleUrls: ["./role-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent extends BaseComponent implements OnInit {
    roleForm: FormGroup;
    displayedColumns = ["module", "view", "delete", "edit", "create"];
    dataSource = new MatTableDataSource<Permission>();
    modulesMapped: any[] = [];
    @Output() sendResponse: EventEmitter<Role> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<RoleFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super("Role Management");
    }

    ngOnInit(): void {
        this._errorEmitService.currentMessage.subscribe((item) => {
            this.errorType = item.type;
            this.responseMessage = item.message;
        });
        this.roleForm = new FormGroup({
            id: new FormControl(this.data.role.id),
            name: new FormControl(this.data.role.name, [Validators.required]),
            description: new FormControl(this.data.role.description, [
                Validators.required,
            ]),
            modules: new FormArray([]),
        });
        const formArray = this.modules;
        this.data.modules.forEach((item) => {
            const form = this.createFormGroup(item);
            formArray.push(form);
        });
        this.dataSource.data = this.data.modules;
    }
    get modules() {
        return this.roleForm.get("modules") as FormArray;
    }

    createControl(value) {
        return new FormControl(value ? value : false);
    }
    getFormControl(form, key) {
        return form.get(key);
    }
    createFormGroup(module) {
        const form = new FormGroup({
            module: new FormControl(module),
        });
        module.permissions.forEach((permission) => {
            form.addControl(
                permission.record_type,
                this.createControl(permission.value)
            );
        });
        return form;
    }
    onSubmit() {
        const model = { ...this.roleForm.value };
        let permissions = [];
        model.modules.forEach((element) => {
            const data = this.getCheckedKey(element);
            if (data && data.length > 0) {
                permissions = permissions.concat(data);
            }
        });
        model.permissions = permissions;
        this.sendResponse.emit(model);
    }
    getCheckedKey(element) {
        const checked = Object.keys(element).filter((key) => {
            return element[key] == true;
        });
        const module = this.data.modules.find(
            (module) => module.id === element.module.id
        );
        const permissions = [];
        checked.forEach((key) => {
            const permission = element.module.permissions.find(
                (item) => item.record_type == key
            );

            permissions.push({ id: permission.module_permission_id });
        });
        if (this.data.role.id && this.data.role.id.length > 0) {
            module.permissions.forEach((x) => {
                const exist = permissions.find(
                    (item) => item.id == x.module_permission_id
                );
                if (!exist && x.value) {
                    permissions.push({
                        id: x.module_permission_id,
                        _deleted: true,
                    });
                }
            });
        }

        return permissions;
    }
    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
}
