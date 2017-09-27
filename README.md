# node-module-proxy

you can proxy function and object directly  
you can proxy string and number use as function

``` js 
const Proxy = require("node-module-proxy");
const proxy = Proxy();

let p = proxy.value;

let source = {a:1,b:2}
proxy.use(source);

console.log(p.a+p.b);
// 3

proxy.use("abc")

console.log(p());
// abc
```