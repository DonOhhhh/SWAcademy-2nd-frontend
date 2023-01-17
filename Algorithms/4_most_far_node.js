function solution(n, edge) {
    const graph = Array.from(Array(n + 1), () => []);
    for (const [src, dest] of edge) {
        graph[src].push(dest);
        graph[dest].push(src);
    }

    const distance = Array(n + 1).fill(0);
    distance[1] = 1;

    //BFS
    const queue = [1];
    while (queue.length > 0) {
        const src = queue.shift(); // shift는 O(n)이지만 요소가 적을 경우에는 자바스크립트 엔진이 최적화 해준다.
        for (const dest of graph[src]) {
            if (distance[dest] == 0) {
                queue.push(dest);
                distance[dest] = distance[src] + 1;
            }
        }
    }
    const max = Math.max(...distance);
    return distance.filter(item => item === max).length;
}