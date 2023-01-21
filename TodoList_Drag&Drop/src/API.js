const API_END_POINT = 'https://todo-api.roto.codes/roto'


export const request = async (url = '', options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, options)
        if(!res.ok) throw new Error('API 호출 에러')
        return await res.json()
    } catch (error) {
        alert(e.message)
    }
}