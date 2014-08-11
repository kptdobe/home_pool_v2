var storage = require('node-persist');
storage.initSync();

var STORAGE_KEY = "localstorage";

var persistence = storage.getItem(STORAGE_KEY);
if (!persistence) {
    persistence = {};
}


module.exports.read = function (ns, key) {
    return persistence[ns + "/" + key];
};

module.exports.write = function (ns, key, object) {
    persistence[ns + "/" + key] = object;
    storage.setItem(STORAGE_KEY, persistence);
};

//then start using it
//storage.setItem('name','yourname');
//console.log(storage.getItem('name'));

//var batman = {
//    first: 'Bruce',
//    last: 'Wayne',
//    alias: 'Batman'
//};

//storage.setItem('batman',batman);
//console.log(storage.getItem('batman').alias);