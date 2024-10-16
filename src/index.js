const { PromisePool } = require('@supercharge/promise-pool')

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

const func = async(time) => {
    await sleep(time)
    console.log(time)
    return time
}

const main = async () => {
    const { results, errors } = await PromisePool
        .for([func(10000), func(10000), func(500), func(200), func(10000),])
        .withConcurrency(2)
        .handleError(async (error, user) => {
            console.error(`error $${error} at ${user}`)
        })
        .process(async(member, index, pool) => {
            const result = await member
            return result
        })
        console.log(results)
        console.log(errors)
}

main()
