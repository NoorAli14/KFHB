import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MapperService {
    result: Array<any>;
    constructor() {}
    makeModulesFlat(modules) {
        this.result = [];
        this.makeFlat(modules, null);
        return this.result;
    }
    private makeFlat(modules: any[], parent_id) {
        modules.forEach((item) => {
            item.parent = item.parent_id ? item.parent_id : "N/A";
            item.module = item.name;
            this.result.push(item);
            if (item.sub_modules && item.sub_modules.length > 0) {
                this.makeFlat(item.sub_modules, item.module);
            }
        });
    }

    findPermission(modules, id) {
        let module, flag;
        modules.forEach((element) => {
            if (flag) return;
            if (element.id !== id) {
                if (!element.sub_modules) return;
                const returned = this.findPermission(element.sub_modules, id);
                module = returned;
            } else {
                flag = true;
                module = element;
            }
        });
        return module;
    }
}
