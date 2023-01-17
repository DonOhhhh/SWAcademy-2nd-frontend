const storage = window.localStorage;

export const setItem = (key, value) => {
    try {
        storage.setItem(key, value)
    } catch (error) {
        console.log(e)
    }
}

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.log(error);
        return defaultValue;
    }
}

