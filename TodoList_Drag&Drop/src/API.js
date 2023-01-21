const API_END_POINT = 'https://todo-api.roto.codes'


export const request = async (url) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`)
        if(!res.ok) throw new Error('API 호출 에러')
        return await res.json()
    } catch (error) {
        alert(e.message)
    }
}