fetch('https://kdt.roto.codes/todos')
    .then(res => {
        return res.json() // Promise 객체
    })
    .then(todos => {
        console.log(todos)
    })