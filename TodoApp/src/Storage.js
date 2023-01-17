const storage = window.localStorage

export const setItem = (key, value) => {
    try {
        storage.setItem(key, JSON.stringify(value))
        console.log(key,value)
    } catch(e) {
        console.log(e)
    }
}
export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key)
        if(!storedValue) {
            return defaultValue;
        }
        const parsedValue = JSON.parse(storedValue);
        return parsedValue;
    } catch (error) {
        console.log(error)
    }
}
export const removeItem = (key) => {
    try {
        storage.removeItem(key);
    } catch (error) {
        console.log(error)
    }
}