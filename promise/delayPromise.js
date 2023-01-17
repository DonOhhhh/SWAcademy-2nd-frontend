const delay = (delayTime) => {
    return new Promise(resolve => setTimeout(resolve, delayTime))
}

const work = () => {
    console.log('work start')
    delay(1000)
        .then(() => {
            console.log('work 1 complete.')
            return delay(1000)
        })
        .then(() => {
            console.log('work 2 complete.')
            return delay(1000)
        })
        .then(() => {
            console.log('work 3 complete.')
            return delay(1000)
        }).then(() => {
            console.log('All work completed!')
        })
    console.log('work end')
}
work()