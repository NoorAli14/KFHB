import {pick,omit} from 'lodash';
export const cloneDeep = (value) => {
    return JSON.parse(JSON.stringify(value));
}

export const manageAudit = (item) => {
    const audit =pick(item, ['created_on', 'updated_on', 'created_by', 'updated_by']);
    item =omit(item, ['created_on', 'updated_on', 'created_by', 'updated_by']);
    item.audit = audit;
    return item;
}
