import { Output, EventEmitter, Injectable, Injector, OnDestroy } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '@feature/entitlement/models/role.model';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Permission } from '@feature/entitlement/models/config.model';
import { camelToSentenceCase } from '@shared/helpers/global.helper';
import { MODULES } from '@shared/constants/app.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent extends BaseComponent implements OnDestroy, OnInit {
    roleForm: FormGroup;
    displayedColumns = ['module'];
    dataSource = new MatTableDataSource<Permission>();
    modulesMapped: any[] = [];
    
    
    @Output() sendResponse: EventEmitter<Role> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<RoleFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _roleService: RoleService
        ,
        injector: Injector
        ) {
            super(injector, MODULES.ROLE_MANAGEMENT);
    }

    ngOnInit(): void {
        const totalPermissions = this.data.permissions.map((x) => x.record_type);
        this.displayedColumns = this.displayedColumns.concat(totalPermissions);
     
        this.roleForm = new FormGroup({
            id: new FormControl(this.data.role.id),
            name: new FormControl(this.data.role.name, [Validators.required, Validators.minLength(3), Validators.maxLength(96)]),
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
    get modules(): FormArray {
        return this.roleForm.get('modules') as FormArray;
    }

    createControl(value): FormControl {
        return new FormControl(value ? value : false);
    }
   
    createFormGroup(module): FormGroup {
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
    onSubmit(): void {
        const model = { ...this.roleForm.value };
        let permissions = [];
        model.modules.forEach((element) => {
            const data = this._roleService.getSelectedPermissions(this.data, element);
            if (data && data.length > 0) {
                permissions = permissions.concat(data);
            }
        });
        if(permissions.filter(x=>!x._deleted).length<1){
            this._notifier.warning('Must select atleast one module to continue.');
            return;
        }
        model.permissions = permissions;
        this.sendResponse.emit(model);
    }
    
    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
  
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this._dialogRef.closeAll();
    }
    onClose(): void{
        this.sendResponse.emit();
        this.matDialogRef.close();
    }
}
