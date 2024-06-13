const { dummyJOb } = require("./dummy.job.js");
const { dummyJOb2 } = require("./dummy2.job.js");

const cronManager = new Map();

cronManager.set('dummyJob', dummyJOb)
cronManager.set('dummyJob2', dummyJOb2)

module.exports = cronManager