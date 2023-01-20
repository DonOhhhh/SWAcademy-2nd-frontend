const API_END_POINT = `https://mwu.roto-cat-search-api.programmers.co.kr/api/cats`

export const request = async (url) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`)
        if(!res.ok) throw new Error("API 호출 에러")
        return await res.json()
    } catch (error) {
        console.log(error.message)
    }
}