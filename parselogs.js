const logparser = require('common-log-format')
const fs = require('fs')
const stream = require('stream')

// max # of pages to emit stats about
const pageLimit = 50

const ignorePat = /^GET \/assets/

let input = fs.createReadStream('logs/access.log')
let logObjects = input.pipe(new logparser())

let counts = {}

logObjects.on('data', (chunk) => {
  let logLine = JSON.parse(chunk)
  if (!ignorePat.test(logLine.request) && logLine.status < 300) {
    counts[logLine.request] = (counts[logLine.request] || 0) + 1
  }
})

let output = fs.createWriteStream('logs/access.log.json')
logObjects.pipe(output)

output.on('finish', () => {
  let topK = []

  for (let req in counts) {
    topK.push([req, counts[req]])
  }
  
  topK.sort((a, b) => (b[1] - a[1]))
  topK = topK.slice(0, pageLimit)

  fs.writeFileSync('logs/topK.json', JSON.stringify(topK))
})
