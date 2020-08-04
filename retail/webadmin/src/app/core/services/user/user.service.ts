import { StorageService } from "./../storage/storage.service";
import { Injectable } from "@angular/core";
import { APP_CONST } from "@shared/constants/app.constants";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private _user;
    private _isLoggedIn: boolean;
    private _sidebarModules: any;
    private config = [
        {
            id: "a1",
            icon: "assignment_ind",
            url: "",
            translate: "FEATURES.ENTITLEMENT.TITLE",
        },
        {
            id: "a2",
            icon: "person",
            url: "/ent/user",
            translate: "FEATURES.ENTITLEMENT.USER.TITLE",
        },
        {
            id: "a3",
            icon: "settings_applications",
            url: "/ent/config",
            translate: "FEATURES.ENTITLEMENT.CONFIG.TITLE",
        },
        {
            id: "a4",
            icon: "calendar_today",
            url: "",
            translate: "FEATURES.CALENDER.TITLE",
        },
        {
            id: "a5",
            icon: "calendar_today",
            url: "/calender/working-days",
            translate: "FEATURES.CALENDER.WORKING_DAYS.TITLE",
        },
        {
            id: "a6",
            icon: "calendar_today",
            url: "/calender/holidays",
            translate: "FEATURES.CALENDER.HOLIDAYS.TITLE",
        },
    ];
    constructor(private storage: StorageService) {}

    setUser(user) {
        this._user = user;
        const sidebarModules = this.configureModules(user.modules);
        this._sidebarModules = sidebarModules;
        this.storage.setItem(APP_CONST.CURRENT_USER, user);
        this.storage.setItem(APP_CONST.SIDEBAR, sidebarModules);
    }
    getUser() {
        if (this._user) return this._user;
        const user = this.storage.getItem(APP_CONST.CURRENT_USER);
        return user ? user : null;
    }
    isLoggedIn() {
        return this._isLoggedIn;
    }
    getSidebarModules() {
        if (this._sidebarModules) return this._sidebarModules;
        return this.storage.getItem(APP_CONST.SIDEBAR);
    }
    private configureModules(modules: any[]) {
        return modules.map((item) => {
            item.type = item.children ? "collapsable" : "item";
            const data = this.config.find((x) => x.id === item.id);
            if (item.children) {
                const child = this.configureModules(item.children);
                delete item.children;
                item = { ...item, children: child };
            }
            item = { ...item, ...data };
            return item;
        });
    }
}
