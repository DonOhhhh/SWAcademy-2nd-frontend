const delay = (delayTime) => {
    return new Promise(resolve => setTimeout(resolve, delayTime))
}

const work = async () => {
    console.log('work start')

    await delay(1000)
    console.log('work 1 complete.')

    await delay(1000)
    console.log('work 2 complete.')

    await delay(1000)
    console.log('work 3 complete.')

    await delay(1000)
    console.log('work all complete.')

    console.log('work complete')
}
work()