const fs = require('fs/promises')

const readFile = async (filename) => {
  return await fs.readFile(filename, 'utf-8')
}

module.exports = { readFile }