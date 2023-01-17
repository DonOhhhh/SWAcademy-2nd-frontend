// 로그 시간 = 이진 탐색
// times -> 선형 로그 시간으로 충분히 가능!
// 우리는 특정 값을 찾는 것이 아님
// 우리가 찾는 것은 최소 몇 분에 모든 심사가 끝나는가?
// 결정문제 = 이진 탐색 = 파라매트릭 서치(Parametric Search)

// 최소 1분에서 (10억 * n)분
// 면접관들이 몇 명을 처리하는가?
// 처리 가능한 입국자 n보다 작다면 분을 올려야되고 입국자가 n보다 크다면 분을 낮춘다.
// 면접관이 시간대비 몇 명을 처리할 수 있는가?
// 시간 / 심사시간 = 심사관 당 처리 가능한 입국자 수

function solution(n, times) {
    // 이진 탐색을 이용하기 위해 정렬해줌.
    const sortedTimes = times.sort((a, b) => a - b);
    let left = 1;
    let right = n * sortedTimes[sortedTimes.length - 1];

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // sum(시간 / 심사시간)
        const sum = times.reduce((acc, time) => acc + Math.floor(mid / time), 0);

        if(sum < n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;

}