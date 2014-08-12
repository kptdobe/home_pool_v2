var storage = require('node-persist');
storage.initSync();

var STORAGE_KEY = "localstorage";

var persistence = storage.getItem(STORAGE_KEY);
if (!persistence) {
    persistence = {};
}

module.exports.read = function (ns, key) {
    return persistence[ns] ? (key ? persistence[ns][key] : persistence[ns]) : {};
};

module.exports.write = function (ns, key, object) {
    if (!persistence[ns]) {
        persistence[ns] = {};
    }
    persistence[ns][key] = object;
    storage.setItem(STORAGE_KEY, persistence);
};