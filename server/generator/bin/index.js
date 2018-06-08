var processApi = require('../lib/api')
var processUi = require('../lib/ui')
var processDb = require('../lib/db')
var program = require('commander')

const map = require('../test/map')

program
  .version('0.0.1')
  .option('-a, --api', 'Generator Restful API')
  .option('-u, --ui', 'Generator Antd UI')
  .option('-m, --menu', 'Generator Antd Menu')
  .option('-d, --db', 'Generator DB')
  .parse(process.argv);
if (program.api) {
    processApi.processApi(map);
} else if (program.ui) {
    processUi.processUi(map);
} else if (program.menu) {
    processUi.processMenu(map);
} else if (program.db) {
    processDb.processDB(map);
} else {
    processDb.processDB(map);
    processApi.processApi(map);
    processUi.processUi(map);
    processUi.processMenu(map);
}

