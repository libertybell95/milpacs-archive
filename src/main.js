const { pullMilpacs } = require('./lib/api')
const fs = require('fs')

pullMilpacs().then(m => {
  fs.writeFileSync('test.json', JSON.stringify(m))
}).catch(err => console.error(err))