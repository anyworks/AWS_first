var context = {
    done: function() {}
};
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {
    flags: 'w'
});

var originalLog = console.log;
console.json = function(json) {
    console.log("%j", json);
};

console.log = function() {
    if (arguments.length == 2) {
        log_file.write(util.format(arguments[0], arguments[1]) + "\n");
        originalLog(arguments[0], arguments[1]);
        originalLog("\n");
    } else {
        log_file.write(util.format(arguments[0]) + "\n");
        originalLog(arguments[0] + "\n");
    }
};

var t = require("../index");
t.handler({
    key: ""
}, context, function() {})
