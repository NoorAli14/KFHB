import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MapperService {
    result: Array<any>;
    sidebar: Array<any>;
    constructor() {}
    makeModulesFlat(modules): any {
        this.result = [];
        if (modules && modules.length > 0){
            this.makeFlat(modules);
        }
        return this.result;
    }
    makeSiderFlat(modules): any {
        this.sidebar = [];
        if (modules && modules.length > 0){
            this.makeSidebarModuleFlat(modules);
        }
        return this.sidebar;
    }
    private makeFlat(modules: any[]): void {
        modules.forEach((item) => {
            item.parent = item.parent_id ? item.parent_id : 'N/A';
            item.module = item.name;
            if (item.parent_id) {
                this.result.push(item);
            }
            if (item.sub_modules && item.sub_modules.length > 0) {
                this.makeFlat(item.sub_modules);
            }
        });
    }
    private makeSidebarModuleFlat(modules: any[]): void {
        modules.forEach((item) => {
            item.module = item.name;
            if (item.parent_id) {
                this.sidebar.push(item);
            }
            if (item.children && item.children.length > 0) {
                this.makeSidebarModuleFlat(item.children);
            }
        });
    }
    findPermission(modules, id): any {
        let module;
        let flag;
        modules.forEach((element) => {
            if (flag) { return; }
            if (element.id !== id) {
                if (!element.sub_modules) { return; }
                const returned = this.findPermission(element.sub_modules, id);
                module = returned;
            } else {
                flag = true;
                module = element;
            }
        });
        return module;
    }
 filterData(array, field, value: string= ''): string[] {
        if (!array || !value){return ; }
        const filterValue = value?.toString().toLowerCase();
        return array.filter(option => {
            if (!option[field]) {return; }
            return option[field]?.toString().toLowerCase().indexOf(filterValue) === 0;
        });
      }
}
