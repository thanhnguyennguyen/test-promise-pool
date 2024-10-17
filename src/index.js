const { PromisePool } = require('@supercharge/promise-pool')

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

const func = async(time) => {
    await sleep(time)
    console.log(time)
    return time
}

const main = async () => {
    const { results, errors } = await PromisePool
        .for([10000, 2000, 1000, 3000])
        .withConcurrency(2)
        .useCorrespondingResults()
        .handleError(async (error, user) => {
            console.error(`error $${error} at ${user}`)
        })
        .onTaskFinished((item, pool)=> {
            console.log(`processed ${pool.processedPercentage()}`)
        })
        .process(async(item, index, pool) => {
            const result = await func(item)
            return result
        })
        console.log(results)
        console.log(errors)
}

main()
