export default class Item {
    constructor(name, price, chance) {
        this._name = name
        this._price = price
        this._chance = chance
    }

    get name() {
        return this._name
    }

    get price() {
        return this._price
    }

    get chance() {
        return this._chance
    }

    set name(value) {
        this._name = value

        return this
    }

    set price(value) {
        this._price = value

        return this
    }

    set chance(value) {
        this._chance = value

        return this
    }
}
