const deepCloneObj = (obj) => {

    if (typeof obj !== "object") return obj;

    let newObj = Array.isArray(obj) ? [] : {};

    const glob = typeof window === "undefined" ? global : window;
    if (!glob.JSON) {
        newObj = JSON.parse(JSON.stringify(obj));
    } else {
        for(let item in obj) {
            newObj[item] = typeof obj[item] === 'object' ? deepCloneObj(obj[item]) : obj[item];
        }
    }

    return newObj;
};
