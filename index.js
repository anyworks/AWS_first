'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    () => {
      var request = require("request");
      var cheerio = require("cheerio");
      request(
        {
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
    }
      var fs = require("request");
    console.log(fs);

    context.done(null, {result:"success"});
    callback(null, event.key1);  // Echo back the first key value
    // callback('Something went wrong');
};
