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
    title = "";
    displayedColumns = [
        "module",
        "view",
        "delete",
        "edit",
        "create",
    ];
    dataSource = new MatTableDataSource<Permission>();
    modulesMapped: any[] = [];
    @Output() sendResponse: EventEmitter<Role> = new EventEmitter<any>();
    constructor(
        public matDialogRef: MatDialogRef<RoleFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super("Config");
    }

    ngOnInit(): void {
        this.roleForm = new FormGroup({
            id: new FormControl(this.data.role.id),
            name: new FormControl(this.data.role.name, [Validators.required]),
            description: new FormControl(this.data.role.description, [
                Validators.required,
            ]),
            modules: new FormArray([]),
        });
        const formArray=this.modules;
        this.data.modules.forEach((item) => {
          const form=  this.createFormGroup(item);
          formArray.push(form)
        });
        this.dataSource.data = this.data.modules;
    }
    get modules() {
        return this.roleForm.get("modules") as FormArray;
    }
   
    createControl() {
        return new FormControl(false);
    }
    getFormControl(form,key){
       return form.get(key)
    }
    createFormGroup(module) {
        const form = new FormGroup({
            module: new FormControl(module.name)
        });
        module.permissions.forEach((permission) => {
            form.addControl(permission.record_type, this.createControl());
        });
        return form;
    }
    onSubmit() {
        const model = { ...this.roleForm.value };
        model.permissions = model.modules.map((module) =>{
            
        })
        this.sendResponse.emit(model);
    }
    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
}
