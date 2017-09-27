/**
 * Created Date: 2017-09-27 10:30:44
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-09-27 10:54:38
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
const Proxy = require("../index");
const assert = require("assert");

function test(a, b) {
    this.a = a;
    this.b = b;
    this.echo = function() {
        return this.a, this.b;
    };
}

test.haha = "abc";
test.abc = "haha";
test.prototype.show = function() {
    return this.a + this.b;
};


function test1(a, b) {
    this.a = a;
    this.b = b;
    this.echo = function() {
        return this.a, this.b;
    };
}

test1.haha1 = "abc1";
test1.abc1 = "haha1";
test1.prototype.show = function() {
    return this.a - this.b;
};

let proxy = new Proxy();
proxy.use(test);
let a = proxy.value;

describe("proxy", function() {
    it("proxy test", function() {
        assert.equal(a.haha, test.haha);
        assert.equal(a.abc, test.abc);
        let b = new a(1, 2);
        let b1 = new test(1, 2);
        assert.equal(b.show(), b1.show());
    });
    it("proxy test1", function() {
        proxy.use(test1);
        assert.equal(a.haha1, test1.haha1);
        assert.equal(a.abc1, test1.abc1);
        b = new a(1, 2);
        b1 = new test1(1, 2);
        assert.equal(b.show(), b1.show());
    });
    it("proxy string", function() {
        proxy.use("test1");
        assert.equal(a(), "test1");
    });
    it("proxy number", function() {
        proxy.use(12);
        assert.equal(a(), 12);
    });
});