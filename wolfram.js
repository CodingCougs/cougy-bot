var wolfram = require('wolfram-alpha').createClient(require('./config').wolframAPPID, opts);
 
var results = yield wolfram.query("integrate 2x")
console.log("Result: %j", results);