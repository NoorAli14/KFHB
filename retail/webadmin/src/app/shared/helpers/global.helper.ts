export const cloneDeep = (value) => {
    return JSON.parse(JSON.stringify(value));
};

export const snakeToCamelArray = (array) => {
    const response = array.map((data) => {
        let mapped = {};
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
    let mapped = {};
    Object.keys(data).forEach((key, index) => {
        const converted = key.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
        );
        mapped[converted] = data[key];
    });
    return mapped;
};
export const getName = (id, key, array) => {
    const data = array.find((item) => item.id == id);
    return data ? data[key] : "N/A";
};

export const camelToSnakeCaseText = (text) => {
    return text.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
    );
};

export const camelToSnakeCase = (data) => {
    let mapped = {};
    Object.keys(data).forEach((key, index) => {
        const converted = key.replace(
            /[A-Z]/g,
            (letter) => `_${letter.toLowerCase()}`
        );
        mapped[converted] = data[key];
    });
    return mapped;
};

export const camelToSnakeCaseText = (text) => {
    return text.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
    );
};

export const camelToSentenceCase = (text) => {
    text=text.replace('Id','');
    text=text.replace('_id','');
    var result = text.replace( /([A-Z])/g, " $1" );
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};
