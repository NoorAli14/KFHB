import { Output, EventEmitter, Injectable } from "@angular/core";
import { BaseComponent } from "@shared/components/base/base.component";
import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { fuseAnimations } from "@fuse/animations";
import { MatTableDataSource } from '@angular/material/table';
import { Permission } from '@feature/entitlement/models/config.model';
import { camelToSentenceCase } from '@shared/helpers/global.helper';

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
    displayedColumns = ["module","canView","canCreate","canDelete","canEdit"];
    dataSource = new MatTableDataSource<Permission>();
    modulesMapped:any[]=[]
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
            modules: new FormControl(this.data.role.modules, [
                Validators.required,
            ])
        });
        // this.modules.forEach((module) =>{
        //     module.module= module.name;
        //     module.canView= module.permissions.find(item=>item.record_type=='view') ? true : false;
        //     module.canCreate= module.permissions.find(item=>item.record_type=='create') ? true : false;
        //     module.canDelete= module.permissions.find(item=>item.record_type=='delete') ? true : false;
        //     module.canEdit= module.permissions.find(item=>item.record_type=='edit') ? true : false;
        // })
        // this.makeFlat(this.modules,'');
        debugger
        this.dataSource.data = this.modulesMapped;
    }

    onSubmit() {
        const model = { ...this.roleForm.value };
        this.sendResponse.emit(model);
    }
    
    makeFlat(modules: any[], parent_id) {
        modules.forEach((item) => {
            item.parent = item.parent_id? item.parent_id :'N/A';
            item.module= item.name;
            this.modulesMapped.push(item);
            if (item.sub_modules && item.sub_modules.length > 0) {
                this.makeFlat(item.sub_modules, item.module);
            }
        });
    }
    camelToSentenceCase(text){
        return camelToSentenceCase(text)
     }
}
