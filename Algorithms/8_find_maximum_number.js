function solution(number, k) {
    const stack = [];
    let count = 0;
    for(const item of number) {
        while (count < k && stack[stack.length-1] < item) {
            stack.pop();
            count++;
        }
        stack.push(item);
    }

    while(count < k) {
        stack.pop();
        count += 1;
    }

    return stack.join('');
}

/*
1231234
112
2334
4332


4177252841
1,1,2,2
4,7,7,5,8,4
877544
*/