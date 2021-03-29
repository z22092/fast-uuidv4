# Fast uuid v4

###  Very fast UUID version 4 variant 1 as specified in [RFC-4122](https://tools.ietf.org/html/rfc4122) generator using c++ [lib](https://github.com/crashoz/uuid_v4) 
---
## Install:	
```bash
$ npm i fast-uuidv4
```
## usage:
```javascript
const { uuidV4 } = require('fast-uuidv4');
const uuid = uuidV4()
console.log(uuid) // c6bc3d9f-3e2c-4170-99e7-b9809f229ecb
```
## Benchmarks:

uuid => https://www.npmjs.com/package/uuid
crypto nodejs => Nodejs Vanilla

|  name |  result |
|--|--|
| uuid  | x 118,166 ops/sec ±5.24% (63 runs sampled) |
| crypto nodejs | x 129,021 ops/sec ±0.81% (55 runs sampled) |
| fast-uuidv4 | x 175,673 ops/sec ±15.86% (29 runs sampled) |

## Run Benchmark:
```bash
$ git clone https://github.com/z22092/fast-uuidv4.git & cd fast-uuidv4/benchmarks
$ npm i & npm start
```



