(function() {
    'use strict';
    var merge = require('merge');
    var Module = function() {};

    Module.prototype.httprequest = function(url,parser) {
        var request = require("request");
        return new Promise(function(resolve,reject){
          request({
                  uri: url,
                  method : 'GET',
                  headers: {}
              },function(error, response, body){
                var res = body;
                if(parser){
                  res = parser.call(null,body);
                }
                resolve(res);
              });
        });
    };

    exports.HttpParsers = new Module();
})();
