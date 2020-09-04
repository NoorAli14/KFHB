import { Modules } from "./../../../models/modules.model";
import { Component, OnInit, Input } from "@angular/core";

import { camelToSentenceCase } from "@shared/helpers/global.helper";
import { Permission } from "@feature/entitlement/models/config.model";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@shared/components/base/base.component";
import { fuseAnimations } from "@fuse/animations";
import { cloneDeep } from "lodash";

@Component({
    selector: "app-permission",
    templateUrl: "./permission.component.html",
    styles: [
        `
            :host {
                width: 100%;
                padding: 10px;
            }
        `,
    ],
    animations: fuseAnimations,
})
export class PermissionComponent extends BaseComponent implements OnInit {
    title = "";
    @Input() modules: Array<Modules>;
    @Input() permissions: Array<Permission>;
    displayedColumns = ["module"];
    dataSource = new MatTableDataSource<any>();
    constructor() {
        super();
    }

    ngOnInit(): void {
        this.modules = this._mapperService.makeModulesFlat(
            cloneDeep(this.modules)
        );
        const totalPermissions = this.permissions.map((x) => x.record_type);
        this.displayedColumns = this.displayedColumns.concat(totalPermissions);
        this.modules.forEach((module) => {
            module['module'] = module.name;
            totalPermissions.forEach((permission) => {
                module[permission] = module.permissions.find(
                    (item) => item.record_type == permission
                )
                    ? true
                    : false;
            });
        });
        this.dataSource.data = this.modules;
    }

    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
}
