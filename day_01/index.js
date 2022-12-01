const fs = require('fs/promises')

const readFile = async (filename) => {
  return await fs.readFile(filename, 'utf-8')
}

/* Straight through approach */
const getMaxCarryingWeight = (weightData) => {
  return Math.max(...weightData.split(/\r\n\r\n/).map(s => s.split(/\r\n/).reduce((a, s) => a += Number.parseInt(s), 0)))
}

/* Straight through approach via sort */
const getTop3CarryingWeightSort = (weightData) => {
  const sortedWeights = weightData.split(/\r\n\r\n/).map(s => s.split(/\r\n/).reduce((a, s) => a += Number.parseInt(s), 0)).sort((a, b) =>  a > b ? -1 : a < b ? 1 : 0)
  return sortedWeights[0] + sortedWeights[1] + sortedWeights[2]
}

/* Dynamic programming approach */
const getTop3CarryingWeightDP = (weightData) => {
  const strings = weightData.split(/\r\n/)
  strings.push('') // allow last iteration to finish
  const sums = [0,0,0,0]
  strings.forEach(s => {
    const num = Number.parseInt(s)
    if(num){
      sums[0] += num
    } else {
      // todo: rethink the solution
      //  problem: [73, 71, 70, 80]
      //  => 73 will replace 71 (second lowest)
      sums.sort((a, b) =>  a > b ? 1 : a < b ? -1 : 0)
      if(sums[0] > sums[3]) sums[3] = sums[0]
      else if(sums[0] > sums[2]) sums[2] = sums[0]
      else if(sums[0] > sums[1]) sums[1] = sums[0]
      sums[0] = 0
    }
  })

  return sums.reduce((t, s) => t += s, 0)
}



(async () => {
  const weightData = await readFile('input.txt')

  const maxCarrying = getMaxCarryingWeight(weightData)
  console.log(maxCarrying)

  const top3CarryingDP = getTop3CarryingWeightDP(weightData)
  console.log(top3CarryingDP)

  const top3CarryingSort = getTop3CarryingWeightSort(weightData)
  console.log(top3CarryingSort)
})()

