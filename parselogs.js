const logparser = require('common-log-format')
const fs = require('fs')
const stream = require('stream')

// max # of pages to emit stats about
const pageLimit = 20

const ignorePat = /^GET (https?\:\/\/|\/assets|\/stats|\/images\/logo)/

let input = fs.createReadStream('logs/access.log')
let logObjects = input.pipe(new logparser())

let counts = {}

logObjects.on('data', (chunk) => {
  let logLine = JSON.parse(chunk)
  let path = logLine.request.replace(/\s+/, ' ')
  if (!ignorePat.test(path) && logLine.status < 300) {
    counts[path] = (counts[path] || 0) + 1
  }
})

let output = fs.createWriteStream('logs/access.log.json')
logObjects.pipe(output)

output.on('finish', () => {
  let topK = []

  for (let req in counts) {
    topK.push([req.split(' ')[1], counts[req]])
  }
  
  topK.sort((a, b) => (b[1] - a[1]))
  topK = topK.slice(0, pageLimit)

  fs.writeFileSync('logs/topK.json', JSON.stringify(topK))
})
