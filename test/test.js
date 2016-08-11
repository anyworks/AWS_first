var context = {
  done : function(){
    console.log("#####################");
    console.log(arguments);
  }
}

var t = require("../index");
t.handler({key:""},context,function(){})
console.log();
