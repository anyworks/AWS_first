'use strict';
//YOUR DATA TO BE PASSED TO LAMBDA FUNCTION.
var event = {
  "Records": [
    {
      "awsRegion": "us-west-2",
      "sequenceNumber": "196800000000000000000374",
      "partitionKey": "2efdb0ea22685b46993e42a67302a001",
      "eventSource": "aws:kinesis",
      "data": "SOME CUSTOM DATA 1"
    }
  ]
};

//BUILD STAB OF context OBJECT.
var context = {
    invokeid: 'invokeid',
    done: function(err,message){
        return;
    }
};


var main = require("./index");

console.log(main);
