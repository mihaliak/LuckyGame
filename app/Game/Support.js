export default class Support {
    static shuffleArray(array) {
        return array.sort(() => .5 - Math.random())
    }

    static sumObjectsKeyValues(objects, key) {
        return objects.reduce((count, item) => {
            return count + item[key]
        }, 0)
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
