
var storage = require('node-persist');
storage.initSync();

//then start using it
//storage.setItem('name','yourname');
//console.log(storage.getItem('name'));

//var batman = {
//    first: 'Bruce',
//    last: 'Wayne',
//    alias: 'Batman'
//};

//storage.setItem('batman',batman);
console.log(storage.getItem('batman').alias);