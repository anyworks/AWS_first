(function() {
var p = require("./my/modules/http1").HttpParsers;
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
})();
