# js对象类型的深拷贝和浅拷贝

## 1、 浅拷贝
### Object.assign(traget,...source)
Object.assign方法是一个浅拷贝的方法（以前以为是深拷贝），它拷贝的是属性值，假如原对象的属性值是一个指向对象引用，它也只会拷贝那个引用值。

 ```
    let obj1 = {a:1,b:{c:2}};
    let obj2 = Object.assign({},obj1);
    console.log(obj2) // {a:1,b:{c:2}};

    obj1.a = 2; // obj1: {a:2,b:{c:2}};  obj2:{a:1,b:{c:2}};
    obj2.a = 3; // obj1: {a:2,b:{c:2}};  obj2:{a:3,b:{c:2}};
    obj2.b.c=5; // obj1: {a:2,b:{c:5}};  obj2:{a:1,b:{c:5}};
 ```

 ### es6扩展运算符
 扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值。
 扩展运算符和Object.assign一样，在对对象进行拷贝时也是浅拷贝，拷贝的也是属性值，如果属性值是引用，也只是拷贝引用值。

 ```
    let obj1 = {a:1,b:{c:2}};
    let obj2 = {...obj1};
    console.log(obj2) // {a:1,b:{c:2}};

    obj1.a = 2; // obj1: {a:2,b:{c:2}};  obj2:{a:1,b:{c:2}};
    obj2.a = 3; // obj1: {a:2,b:{c:2}};  obj2:{a:3,b:{c:2}};
    obj2.b.c=5; // obj1: {a:2,b:{c:5}};  obj2:{a:1,b:{c:5}};
 ```
  es6扩展运算符在对数组进行拷贝时，也属于浅拷贝。

 ```
    let arr1 = [1,2,3,4];
    let arr2 = [...arr1];
    arr1.push(5); // arr1: [1,2,3,4,5]  arr2:[1,2,3,4]
 ```
 数组的深拷贝还可以使用 **slice**和**contact**以及**map**等方法。

 ## 2、深拷贝对象

 ### json对象的parse与stringify方法
 
 ```
    let obj1 = {a:1,b:{c:2}};
    let obj2 = JSON.parse(JSON.stringify(obj1));
 ```
 这种方法使用较为简单，可以满足基本的深拷贝需求，而且能够处理JSON格式能表示的所有数据类型，但是对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。还有一点不好的地方是它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object。同时如果对象中存在循环引用的情况也无法正确处理。

 ### 自己实现一个方法

 ```
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

 ```
[查看更完整代码](index.js)

 