const print = console.log
function solution(tickets) {
    tickets.sort()
    const graph = {}
    tickets.forEach(([s,e]) => s in graph ? graph[s].push(e) : graph[s] = [e])
    const stack = ['ICN']
    const route = ['ICN']
    const visited = []
    while(stack.length) {
        const airport = stack.pop()
        if(!visited.includes(airport))
            visited.push(airport)
        route.push(airport)
        if(graph[airport])
            stack.push(...graph[airport].reverse())
    }
    print(route)
}

solution([["ICN", "A"], ["ICN", "B"], ["B", "ICN"]]);