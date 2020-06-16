// let node = false;
// try {
//     node = (Object.prototype.toString.call(global.process) === '[object process]');
// }
// catch (e) {
// }

// module.exports = node ? require('./dist/decimal-sdk-node') : require('./dist/decimal-sdk-web');
module.exports = require('./dist/decimal-sdk-web');
