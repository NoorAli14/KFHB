import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MESSAGES } from "@shared/constants/messages.constant";
import { isArray } from "lodash";

export const cloneDeep = (value) => {
    return JSON.parse(JSON.stringify(value));
};

export const snakeToCamelArray = (array) => {
    const response = array.map((data) => {
        const mapped = {};
        Object.keys(data).forEach((key, index) => {
            const converted = key.replace(/([-_][a-z])/g, (group) =>
                group.toUpperCase().replace("-", "").replace("_", "")
            );
            mapped[converted] = data[key];
        });
        return mapped;
    });

    return response;
};
export const snakeToCamelObject = (data) => {
    if (!data) {
        return;
    }
    const mapped = {};
    Object.keys(data).forEach((key, index) => {
        const converted = key.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
        );
        mapped[converted] = data[key];
    });
    return mapped;
};
export const getName = (id, key, array) => {
    if (!array) {
        return;
    }
    const data = array.find((item) => item.id === id);
    return data ? data[key] : "N/A";
};

export const camelToSnakeCaseText = (text) => {
    return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const camelToSnakeCase = (data) => {
    const mapped = {};
    Object.keys(data).forEach((key, index) => {
        const converted = key.replace(
            /[A-Z]/g,
            (letter) => `_${letter.toLowerCase()}`
        );
        mapped[converted] = data[key];
    });
    return mapped;
};

export const camelToSentenceCase = (text) => {
    text = text.replace("Id", "");
    text = text.replace("_id", "");
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

export const removeRandom = (text) => {
    return text.replace(/\d+/g, '');
};

export const extractErrorString = (response) => {
    if (response.errors && !isArray(response.errors)) {
        return response.errors.message;
    } else if (response.errors && isArray(response.errors)) {
        return response.errors[0].message;
    } else {
        return MESSAGES.UNKNOWN;
    }
};
const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];
export const sortWeekDays = (a, b) => {
    return daysOfWeek.indexOf(a.weekDay) - daysOfWeek.indexOf(b.weekDay); // basic sort function that compares the indexes of the two days
};

export const regexValidator = (
    regex: RegExp,
    error: ValidationErrors
): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
            return null;
        }
        const valid = regex.test(control.value);
        return valid ? null : error;
    };
};

export const isUUID = (uuid) => {
    let s: any = "" + uuid;

    s = s.match(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    );
    if (s === null) {
        return false;
    }
    return true;
};
