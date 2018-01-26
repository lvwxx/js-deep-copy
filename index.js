// 满足Obj和Array
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


// 更加完整deep-clone obj
const { hasOwnProperty } = Object.hasOwnProperty; // 代理检验是否是自身属性的方法

// 是否是undefiend 和 null
function isDef(val) {
    return val !== 'undefiend' && val !== 'null';
}

// 是否是对象
function isObj(x) {
    const type = typeof x;
    return type !== null && (type === 'object' || type === 'function');
}

// 拷贝
function assignKey(to, from, key) {
    const val = from[key];

    if (!isDef(val) || (hasOwnProperty.call(to, key) && !isDef(to[key]))) {
        return;
    }

    if (!hasOwnProperty.call(to, key) || !isObj(val)) {
        to[key] = val;
    } else {
        to[key] = assign(Object(to[key]), from[key]);
    }
}

// 递归这个对象
function assign(to, from) {
    for(const key in from) {
        if(hasOwnProperty.call(from, key)) {
            assignKey(to, from, key);
        }
    }
    return to;
}

// 入口，对参数做判断
function deepClone(obj) {
    if (Array.isArray(obj)) {
        return obj.map(i=>deepClone(i));
    } else if (typeof obj === 'object') {
        return assign({}, obj);
    }

    return obj;
}

