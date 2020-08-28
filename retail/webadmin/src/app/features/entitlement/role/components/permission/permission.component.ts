import { Component, OnInit, Input } from "@angular/core";

import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import {  camelToSentenceCase } from "@shared/helpers/global.helper";
import { Permission } from "@feature/entitlement/models/config.model";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from '@shared/components/base/base.component';

@Component({
    selector: "app-permission",
    templateUrl: "./permission.component.html",
    styles:[`:host {
        width: 100%;
        padding:10px;
    }`]
})
export class PermissionComponent extends BaseComponent implements OnInit {
    title = "";
    @Input() modules: Array<any> 
    displayedColumns = ["module","canView","canCreate","canDelete","canEdit"];
    dataSource = new MatTableDataSource<Permission>();
    modulesMapped:any[]=[]
    constructor(private _service: ConfigMiddlewareService) {
        super()
    }

    ngOnInit(): void {
        this.makeFlat(this.modules,'');
        this.modulesMapped.forEach((module) =>{
            module.module= module.name;
            module.canView= module.permissions.find(item=>item.record_type=='view') ? true : false;
            module.canCreate= module.permissions.find(item=>item.record_type=='create') ? true : false;
            module.canDelete= module.permissions.find(item=>item.record_type=='delete') ? true : false;
            module.canEdit= module.permissions.find(item=>item.record_type=='edit') ? true : false;
        })
        this.dataSource.data = this.modulesMapped;
    }

    getData() {
        // this._service.forkPermissionData(this.roleModuleId).subscribe(
        //     (response) => {
        //         [this.roleModulesList,this.permissions]=response;
        //         this.dataSource.data = this.roleModulesList;
        //         console.log(response)
        //     },
        //    (response=>super.onError(response))
        // );
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
