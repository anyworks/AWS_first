(function() {
    'use strict';
    var Module = function() {};
    var instance = new Module();
    if(exports){
       exports.simple = instance;
    }
    if(module){
        module.exports.simple = instance;
    }
})();
