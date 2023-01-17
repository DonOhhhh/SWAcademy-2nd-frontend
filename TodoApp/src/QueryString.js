export const parse = (queryString) => {
    return queryString.split('&').reduce((acc,cur) => {
        const [key,value] = cur.split('=')
        if(key && value) {
            acc[key] = value;
        }
        return acc;
    }, {})
}