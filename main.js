exports.handler = function(event, context, callback) {
    //var aws = require("./awsmodulesmodules/aws").AWS;
    //aws.apacrequest();

    //Promise
    //var estat = require("./awsmodulesmodules/estat").Estat;
    // estat.invokeRequest("getStatsList").then(function(res){
    //   console.log("%j",res);
    // });

    var p = require("./awsmodules/modules/http1").HttpParsers;
    function parser (res) {
      var cheerio = require('cheerio');
      var $ = cheerio.load(res);

      var c = $(".node-video").map(function(i,e){
        var t = $(e).find("a");
        var r = {};
        r[t.text()] = t.attr("href");
        return r;
      }).get();
      return c;
    }

    var promises = [];
    promises.push(p.httprequest("prseURL",parser));
    Promise.all(promises).then(function(values){
      var last = values.reduce(function(prev,c){
         var ret = prev.concat(c);
         return ret;
       },[]);

       console.log("%j",last);
    });

    context.done(null, {
        result: "success"
    });
    callback(null, event.key1); // Echo back the first key value
};
