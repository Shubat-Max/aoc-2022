const fs = require('fs/promises')


const readFile = async (filename) => {
  return await fs.readFile(filename, 'utf-8')
}

/* Part 1 - getTotalJobsInclusion TODO: rewrite comments & add task description */
const getTotalJobsInclusion = (jobs) => {
  return jobs
    .split(/\r?\n/)
    .map(row => row.split(",").map(range => range.split("-").map(n => +n)))
    .reduce((jT, [[topFirst, topSecond], [botFirst, botSecond]]) =>
        jT += ((topFirst >= botFirst && topSecond <= botSecond) ||
          (botFirst >= topFirst && botSecond <= topSecond)) ? 1 : 0
    , 0)
}

/* Part 2 - getTotalJobsOverlapped TODO: rewrite this <- */
const getTotalJobsOverlapped = (jobs) => {
  return jobs
    .split(/\r?\n/)
    .map(row => row.split(",").map(range => range.split("-").map(n => +n)))
    .reduce((jT, [[topFirst, topSecond], [botFirst, botSecond]]) =>
        jT += (
          (topFirst >= botFirst && topSecond <= botSecond) ||
          (botFirst >= topFirst && botSecond <= topSecond) ||
          (topSecond >= botFirst && topSecond <= botSecond) ||
          (topFirst >= botFirst && topFirst <= botSecond)
        ) ? 1 : 0
      , 0)
}


(async () => {
  const jobs = await readFile('input.txt')

  console.time('getTotalJobsInclusion')
  const totalJobsInclusion = getTotalJobsInclusion(jobs)
  console.timeEnd('getTotalJobsInclusion')
  console.log(totalJobsInclusion)

  console.time('getTotalJobsOverlapped')
  const totalJobsOverlapped = getTotalJobsOverlapped(jobs)
  console.timeEnd('getTotalJobsOverlapped')
  console.log(totalJobsOverlapped)
})()


// TASK SHOULD BE HERE
// TASK SHOULD BE HERE