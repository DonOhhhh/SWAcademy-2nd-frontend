function solution(s) {
    let count = 0;

    for (const c of s) {
        if (c === '(') {
            count++;
        } else {
            if (count === 0) {
                return false;
            }
            count -= 1;
        }
    }

    return count === 0;
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", function (line) {
    console.log(solution(line))
    rl.close();
}).on("close", function () {
    process.exit();
});
