module.exports = {
    /**
     * Returns a new array containing objects with only the specified properties.
     * @param {Array} arr - The array of objects.
     * @param {Array} props - The properties to include.
     * @return {Array} A new array containing objects with only the specified properties.
     */
    filterProperties: (arr, props) => {
        return arr.map((obj) => {
            const newObj = {};
            props.forEach((prop) => {
                if (obj.hasOwnProperty(prop)) {
                    newObj[prop] = obj[prop];
                }
            });
            return newObj;
        });
    },
    sortByProperty: (arr, prop) => {
        return [...arr].sort((a, b) => {
            if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
                if (typeof a[prop] === "number" && typeof b[prop] === "number") {
                    return a[prop] - b[prop];
                } else {
                    return String(a[prop]).localeCompare(String(b[prop]));
                }
            } else if (a.hasOwnProperty(prop)) {
                return -1;
            } else if (b.hasOwnProperty(prop)) {
                return 1;
            }
            return 0;
        });
    },
    convertToPascalCase: (options = {}) => {
        // Iterate through each key in options & convert _ to camelCase (eg max_tokens becomes maxTokens)
        let newOptions = {};
        for (let key in options) {
            let newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            newOptions[newKey] = options[key];
        }
        return newOptions;
    }
};
