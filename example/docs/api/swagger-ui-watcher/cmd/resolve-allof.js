const path = require('path')
const fs = require('fs')
const resolveAllOf = require('json-schema-resolve-allof')

const inFile = process.argv[2]
const outFile = process.argv[3]

const source = require(path.resolve(inFile))
const out = resolveAllOf(source)

fs.writeFileSync(outFile, JSON.stringify(out, null, 2))
