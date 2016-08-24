(function() {
    var merge = require('merge');

    var Module = function() {};

    var UNLIMITED = "3201084051";
    var COMIC = "3201084051";
    var LADYCOMIC = "2430765051";

    var Awsrequest = function() {
        var OperationHelper = require('apac').OperationHelper;
        var opHelper = new OperationHelper({
            endPoint: 　 'ecs.amazonaws.jp',
            awsId: process.env.AWS_ACCESS_KEY_ID,
            awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
            assocId: process.env.AWS_ASSOC_ID
        });
        return opHelper;
    };

    Module.prototype.browserNode = function() {
        var req = Awsrequest();
        req.execute('BrowseNodeLookup', {
            'BrowseNodeId': UNLIMITED
        }).then(function(res) {
            var json = res.result.BrowseNodeLookupResponse.BrowseNodes;
            console.log(json);

            console.log(json.BrowseNode.Ancestors.BrowseNode);

        })['catch'](function(err) {
            console.log("ERROR!!");
            console.log(err);
        });
    };

    Module.prototype.apacrequest = function() {
        var req = Awsrequest();
        req.execute('ItemSearch', {
            'SearchIndex': 'KindleStore',
            'BrowseNode': LADYCOMIC,
            'ResponseGroup': 'Small,OfferSummary',
            'Sort': 'salesrank',
            'Author': '那波マオ'
        }, function(error, results) {
            if (error) {
                console.error("ERROR RESPONSE");
                console.log("%j",error);
            } else {
                var json;
                if(results.ItemSearchErrorResponse){
                  json = results.ItemSearchErrorResponse;
                  console.log("%j", json);
                  console.log("#### ERROR ####");
                }else{
                  json = results.ItemSearchResponse;
                  if (json.Items.Request.Errors) {
                      console.log("%j", json.Items.Request.Errors);
                      return;
                  }
                  //success
                  console.log("%j", json.Items.Item);
                }
            }
        });
    };
    exports.AWS = new Module();
})();
