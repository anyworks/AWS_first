(function() {
    var merge = require('merge');

    var Module = function() {};
    Module.prototype.invokeRequest = function(type) {
        ////////////////////////////////
        var API_types = {};
        API_types.getStatsList = {
            //    data: { test: "hello" }, // data passed to REST method (only useful in POST, PUT or PATCH methods)
            path: {
                "version": "1.0",
                api: "getStatsList"
            }, // path substitution vars
            parameters: {
                surveyYears: "201510",
                statsField: "0204"
            }
        };
        API_types.getStatsData = {
            //    data: { test: "hello" }, // data passed to REST method (only useful in POST, PUT or PATCH methods)
            path: {
                "version": "1.0",
                api: "getStatsData"
            }, // path substitution var
            parameters: {
                limit: 1000,
                statsDataId: "0003129518"
            }
        };

        return new Promise(function(resolve, reject) {
            var Client = require('node-rest-client').Client;
            var client = new Client();

            var common = {
                parameters: {
                    appId: process.env.ESTAT_APP_ID
                },
                headers: {
                    "Accept-Encoding": "gzip, deflate"
                }
            };
            var args = merge.recursive(true, common, API_types[type]);
            client.get("http://api.e-stat.go.jp/rest/${version}/app/${api}", args, function(data, response) {
                var result;
                for (var i in data) {
                    result = data[i];
                    break;
                }
                try {
                    if (result.RESULT[0].STATUS[0] !== "0") {
                        reject(result.RESULT[0]);
                        console.log("ERROR!!");
                        console.json(result.RESULT[0]);
                    } else {
                        resolve(result.DATALIST_INF[0].LIST_INF);
                        console.json(result.RESULT[0]);
                    }
                } catch (e) {
                    console.log(e);
                    console.log("%j", data);
                }
            });
        });
    };
    exports.Estat = new Module();
})();
