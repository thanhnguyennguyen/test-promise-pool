const { PromisePool } = require('@supercharge/promise-pool')

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

const main = async () => {
    const { results, errors } = await PromisePool
        .for([1, 10, 2, 3, 4, 5, 6, 7])
        .withConcurrency(2)
        .process(async num => {
            await sleep(num * 1000)
            console.log(num)
        })
}

main()
