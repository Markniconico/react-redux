import { pathToRegexp } from 'path-to-regexp';

/**
 *得到匹配结果(match对象),如果不能匹配，返回null
 *如果可以匹配，匹配结果，匹配结果是一个对象，该对象中的属性名对应路径规则中的关键字
 * @param {*} path 路径规则
 * @param {*} pathName 具体的地址
 * @param {*} options 相关配置,改配置是一个对象，对象中可以出现属性：exact(精确匹配)、sensitive(忽略大小写)、strict(严格匹配，When true the regexp won't allow an optional trailing delimiter to match)
 * @returns
 */
export default function pathMatch(path, pathName, options) {
    let keys = [];
    const regxp = pathToRegexp(path, keys, getOptions(options));
    const result = regxp.exec(pathName);
    if (!result) return null; //没有匹配，如果不能匹配，返回null
    let execArr = Array.from(result);
    execArr = execArr.slice(1);
    const params = getParams(execArr, keys);
    return {
        params,
        path,
        url: result[0],
        isExact: pathName === result[0],
    };
}

function getParams(groups, keys) {
    let obj = {};
    for (let i = 0, length = groups.length; i < length; i++) {
        obj[keys[i].name] = groups[i];
    }
    return obj;
}

/**
 * 将传入的react-router配置，转换为path-to-regexp的配置
 * @param {*} options
 */
function getOptions(options = {}) {
    const defaultOptions = {
        exact: false,
        sensitive: false,
        strict: false,
    };
    const opt = { ...defaultOptions, ...options };
    return {
        sensitive: opt.sensitive,
        strict: opt.strict,
        end: opt.exact,
    };
}
