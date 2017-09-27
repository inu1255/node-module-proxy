/**
 * Created Date: 2017-09-27 10:30:01
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-09-27 10:55:03
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
function _copy(source, target) {
    if(!source)return;
    for (let key in source) {
        var property = source[key];
        if (typeof property == "function") {
            target[key] = function() {
                return source[key].apply(source, arguments);
            };
        } else {
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: true,
                get: function() {
                    return source[key];
                },
                set: function(value) {
                    source[key] = value;
                }
            });
        }
    }
    if (source.prototype) {
        target.prototype = source.prototype;
    }
};

function _clear(target) {
    for (let k in target) {
        Reflect.deleteProperty(target, k);
    }
    target.prototype = {};
}

function Proxy(Module) {
    var proxy = function() {
        if (typeof Module != "function") {
            return Module;
        }
        if (this.constructor === proxy) {
            this.__proto__ = Module.prototype;
            let result = Module.apply(this, arguments);
            return typeof result === 'object' ? result : this;
        } else {
            return Module.apply(this, arguments);
        }
    };
    _copy(Module, proxy);
    this.value = proxy;
    this.use = function(mod) {
        Module = mod;
        _clear(proxy);
        _copy(Module, proxy);
    };
}

module.exports = Proxy;