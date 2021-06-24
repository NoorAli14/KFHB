import { MapperService } from './../mappers/mapper.service';
import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { APP_CONST } from '@shared/constants/app.constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventBusService } from '../event-bus/event-bus.service';
import { EmitEvent } from '@shared/models/emit-event.model';
import { Events } from '@shared/enums/events.enum';
import { snakeToCamelObject, uniqeBy } from '@shared/helpers/global.helper';
import { cloneDeep } from 'lodash';

@Injectable({ providedIn: 'root' })
export class AuthUserService {
    private _user;
    private _isLoggedIn: boolean;
    private _sidebarModules: any;
    private config = [
        {
            id: 'agent-portal',
            icon: 'voice_over_off',
            url: '',
            translate: 'FEATURES.AGENT_PORTAL.TITLE',
        },
        {
            id: 'video',
            icon: 'videocam',
            url: '/video',
            translate: 'FEATURES.AGENT_PORTAL.VIDEO.TITLE',
        },
        {
            id: 'customers',
            icon: 'person',
            url: '/customer',
            translate: 'FEATURES.AGENT_PORTAL.CUSTOMER.TITLE',
        },
        {
            id: 'entitlement',
            icon: 'assignment_ind',
            url: '',
            translate: 'FEATURES.ENTITLEMENT.TITLE',
        },
        {
            id: 'users',
            icon: 'person',
            url: '/ent/user',
            translate: 'FEATURES.ENTITLEMENT.USER.TITLE',
        },
        {
            id: 'roles',
            icon: 'settings_applications',
            url: '/ent/role',
            translate: 'FEATURES.ENTITLEMENT.ROLE.TITLE',
        },
        {
            id: 'calender',
            icon: 'calendar_today',
            url: '',
            translate: 'FEATURES.CALENDER.TITLE',
        },
        {
            id: 'working-days',
            icon: 'av_timer',
            url: '/calender/working-days',
            translate: 'FEATURES.CALENDER.WORKING_DAYS.TITLE',
        },
        {
            id: 'holidays',
            icon: 'history',
            url: '/calender/holidays',
            translate: 'FEATURES.CALENDER.HOLIDAYS.TITLE',
        },
        {
            id: 'leaves',
            icon: 'history',
            url: '/calender/leaves',
            translate: 'FEATURES.CALENDER.LEAVES.TITLE',
        },
        {
            id: 'system-management',
            icon: 'settings',
            url: '',
            translate: 'FEATURES.SYSTEM_MANAGEMENT.TITLE',
        },
        {
            id: 'system-audit-log',
            icon: 'update',
            url: '/system',
            translate: 'FEATURES.SYSTEM_MANAGEMENT.LOGS.TITLE',
        },
        {
            id: 'international',
            icon: 'update',
            url: '/international-transfer-requests',
            translate: 'FEATURES.INTERNATIONALTRANSFERREQUEST.TITLE',
        },
        {
            id: 'finance-application',
            icon: 'update',
            url: '/finance',
            translate: 'FEATURES.FINANCE_APPLICATION.TITLE',
        },
    ];

    constructor(
        private storage: StorageService,
        private eventService: EventBusService,
        private mapperService: MapperService
    ) {
        const data = this.storage.getItem(APP_CONST.SIDEBAR);
        if (data) {
            this.modules = data;
        }
    }

    get modules(): any {
        if (this._sidebarModules) { return this._sidebarModules; }
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

        this._user = snakeToCamelObject(user);
        this.eventService.emit(
            new EmitEvent(Events.USER_UPDATED, this._user)
        );
        this.storage.setItem(APP_CONST.CURRENT_USER, this._user);
    }
    get User(): any {
        if (this._user) { return this._user; }
        const user = this.storage.getItem(APP_CONST.CURRENT_USER);
        return user ? user : null;
    }
    setData(response): void {
        const clone = cloneDeep(response);
        const sidebarModules = this.configureModules(clone.modules);
        
        this.modules = this.removeDuplicates(sidebarModules);
        this.User = cloneDeep(response);
    }
    isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
    removeDuplicates(modules: any[]) {
        const copy: any[] = cloneDeep(modules);
        const distinctModules = [];
        modules.forEach((item) => {
            const duplicates = copy.filter(x => x.id == item.id);
            if (duplicates?.length > 1) {
                item.permissions = this.getMergedPermissions(duplicates);
            }
            distinctModules.push(item)
        })
        return uniqeBy(distinctModules,'id');
    }
    getMergedPermissions(modules: any[]) {
        let permissions = [];
        modules.forEach(item => {
            permissions = [...item.permissions, ...permissions]
        })

        return uniqeBy(permissions, 'record_type');
    }
    getPermissionsByModule(name): any {
        let modules;
        if (this._sidebarModules) { modules = this._sidebarModules; }
        else { modules = this.storage.getItem(APP_CONST.SIDEBAR); }
        const flatModule = this.mapperService.makeSiderFlat(modules);
        const module = flatModule.find(x => x.name === name);
        return module ? module.permissions : [];
    }
    private configureModules(modules: any[]): any {
        return modules.map((item) => {
            const isChildren = item.sub_modules && item.sub_modules.length > 0;
            item.type = isChildren ? 'collapsable' : 'item';
            const data = this.config.find((x) => x.id === item.slug);
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
