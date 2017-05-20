export default class ItemsCollection {
    constructor(items = []) {
        this._items = items
    }

    addItem(item) {
        this._items.push(item)

        return this
    }

    get items() {
        return this._items
    }

    set items(items) {
        this._items = items
    }
}
