var imples = {};
var merge = require('merge');

imples.httprequest = function() {
    'use strict';
    var request = require("request");
    var cheerio = require("cheerio");
    request({
            uri: "http://www.google.com/",
        },
        function(error, response, body) {
            var $ = cheerio.load(body); //取得したページのbody部をパース

            $("a").each(function() { //パースした内容にはjQuery風のセレクタでアクセスできる
                var link = $(this);
                var text = link.text();
                var href = link.attr("href");

                console.log(text + " -> " + href);
            });
        }
    );
};

exports.handler = function(event, context, callback) {
    var aws = require("./mymodules/aws").AWS;
    //aws.apacrequest();

    //Promise
    var estat = require("./mymodules/estat").Estat;
    estat.invokeRequest("getStatsList").then(function(res){
      console.log("%j",res);
    });

    context.done(null, {
        result: "success"
    });
    callback(null, event.key1); // Echo back the first key value
};
