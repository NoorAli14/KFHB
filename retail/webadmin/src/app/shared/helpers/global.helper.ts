export const cloneDeep = (value) => {
    return JSON.parse(JSON.stringify(value));
};

export const snakeToCamel = (array) => {
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
export const getName = (id, key, array) => {
    const data = array.find((item) => item.id == id);
    return data ? data[key] : "N/A";
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
