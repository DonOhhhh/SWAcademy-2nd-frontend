const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
let cnt = 0;
rl.on('line', function (line) {    
    
}).on('close', function () {
    console.log(input);
    process.exit;
});