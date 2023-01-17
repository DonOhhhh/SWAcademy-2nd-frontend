import App from "./app.js"

// const dummyData = [
//     {
//         optionId: 1,
//         optionName: "더미 데이터다!",
//         optionPrice: 10000,
//         stock: 10
//     },
//     {
//         optionId: 2,
//         optionName: "더미 데이터2다!",
//         optionPrice: 15000,
//         stock: 10
//     },
//     {
//         optionId: 3,
//         optionName: "더미 데이터3다!",
//         optionPrice: 12000,
//         stock: 0
//     }
// ]

const $target = document.querySelector('#app')
new App({ $target })
// new ProductPage({
//     $target,
//     initialState: {
//         productId: 1
//     }
// })