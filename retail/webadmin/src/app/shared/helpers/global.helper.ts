import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MESSAGES } from "@shared/constants/messages.constant";
import { MatSortDirection } from "@shared/enums/app.enum";
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
export const constantCaseToSentenceCase = text => {
    return text.split('_').map(word => {
        const mapped = word.toLowerCase().replace("screenshot", "")
        const result = mapped.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }).join(' ');
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

export const snakeToSentenceCase = (str) => {
    const res = str.split('_').map(t => t[0].toUpperCase()+t.slice(1,)).join(" ");
    return res;
}

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
    } else if (response.errors && isArray(response.errors) && response.errors.length > 0) {
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

export const uniqeBy = (a, key) => {
    var seen = {};
    return a.filter(function (item) {
        var k = item[key];
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })

}

export const b64DecodeUnicode = (str) => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export const getRecentRecord = (array, date) => {
    const mostRecentDate = new Date(Math.max(...array.map(e => new Date(e[date]))));
    const mostRecentObject = array.filter(e => {
        const d = new Date(e[date]);
        return d.getTime() == mostRecentDate.getTime();
    });
    return mostRecentObject && mostRecentObject.length > 0 ? mostRecentObject[0] : null;
}


export const toggleSort = (previous, current) => {
    const state = previous ? previous : current;
    const updated = state == MatSortDirection.asc ? MatSortDirection.desc : MatSortDirection.asc;
    return updated;
}