import { StorageService } from "./../storage/storage.service";
import { Injectable } from "@angular/core";
import { APP_CONST } from "@shared/constants/app.constants";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { EventBusService } from "../event-bus/event-bus.service";
import { EmitEvent } from "@shared/models/emit-event.model";
import { Events } from "@shared/enums/events.enum";
import { snakeToCamelObject } from "@shared/helpers/global.helper";
import { cloneDeep } from 'lodash';

@Injectable({ providedIn: "root" })
export class AuthUserService {
    private _user;
    private _isLoggedIn: boolean;
    private _sidebarModules: any;
    private config = [
        {
            id: "Entitlement",
            icon: "assignment_ind",
            url: "",
            translate: "FEATURES.ENTITLEMENT.TITLE",
        },
        {
            id: "User Management",
            icon: "person",
            url: "/ent/user",
            translate: "FEATURES.ENTITLEMENT.USER.TITLE",
        },
        {
            id: "Role Management",
            icon: "settings_applications",
            url: "/ent/role",
            translate: "FEATURES.ENTITLEMENT.ROLE.TITLE",
        },
        {
            id: "Calender",
            icon: "calendar_today",
            url: "",
            translate: "FEATURES.CALENDER.TITLE",
        },
        {
            id: "Working Week",
            icon: "calendar_today",
            url: "/calender/working-days",
            translate: "FEATURES.CALENDER.WORKING_DAYS.TITLE",
        },
        {
            id: "Holidays",
            icon: "calendar_today",
            url: "/calender/holidays",
            translate: "FEATURES.CALENDER.HOLIDAYS.TITLE",
        },
    ];

    constructor(
        private storage: StorageService,
        private eventService: EventBusService
    ) {
        const data = this.storage.getItem(APP_CONST.SIDEBAR);
        if (data) {
            this.modules = data;
        }
    }

    get modules() {
        if (this._sidebarModules) return this._sidebarModules;
        return this.storage.getItem(APP_CONST.SIDEBAR);
    }
    set modules(modules) {
        this._sidebarModules = modules;
        this.storage.setItem(APP_CONST.SIDEBAR, modules);
        setTimeout(() => {
            this.eventService.emit(
                new EmitEvent(Events.MODULES_UPDATED, modules)
            );
        }, 1000);
    }

    set User(user) {
        debugger
        this._user = snakeToCamelObject(user);
        this.eventService.emit(
            new EmitEvent(Events.USER_UPDATED, this._user )
        );
        this.storage.setItem(APP_CONST.CURRENT_USER, this._user);
    }
    get User() {
        if (this._user) return this._user;
        const user = this.storage.getItem(APP_CONST.CURRENT_USER);
        return user ? user : null;
    }
    setData(response) {
        const clone= cloneDeep(response)
        const sidebarModules = this.configureModules(clone.modules);
        this.modules = sidebarModules;
        this.User = cloneDeep(response);
    }
    isLoggedIn() {
        return this._isLoggedIn;
    }

    getPermissionsByModule(name) {
        let modules;
        if (this._sidebarModules) modules = this._sidebarModules;
        else modules = this.storage.getItem(APP_CONST.SIDEBAR);

        const module = this.findPermission(modules, name);
        return module ? module.permissions : [];
    }
    private findPermission(modules, name) {
        let module, flag;
        modules.forEach((element) => {
            if (flag) return;
            if (element.name !== name) {
                if (!element.children) return;
                const returned = this.findPermission(element.children, name);
                module = returned;
                flag = true;
            } else {
                flag = true;
                module = element;
            }
        });
        return module;
    }
    private configureModules(modules: any[]) {
        return modules.map((item) => {
            const isChildren=item.sub_modules &&  item.sub_modules.length > 0;
            item.type = isChildren ? "collapsable" : "item";
            const data = this.config.find((x) => x.id === item.name);
            if (isChildren) {
                const child = this.configureModules(item.sub_modules);
                delete item.sub_modules;
                item = { ...item, children: child };
            }
            item = { ...item, ...data };
            return item;
        });
    }
}
