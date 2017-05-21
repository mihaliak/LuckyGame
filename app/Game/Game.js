export default class Game {
    constructor(items, config) {
        this._originalItems = items
        this._items = []
        this._winner = null
        this._rounds = 10

        this._config = {
            duration: 3
        }

        this._elements = {
            items: document.querySelector('.items'),
            result: document.querySelector('.result')
        }

        if (config) {
            this._config = Object.assign({}, this._config, config)
        }

        this.reset()
    }

    resetItems() {
        this._items = this._originalItems
    }

    duplicateItems() {
        this._items = [].concat.apply([], Array.apply(null, new Array(this._rounds)).map(() => {
            return this._items
        }));

        this._items = this._items.sort(() => .5 - Math.random())
    }

    render() {
        for (let i = 0; i < this._items.length; i++) {
            let item = this._items[i]

            this._elements.items.innerHTML += `<li class="item" id="item-${i}">${item.name}<span>${item.price} &euro;</span></li>`
        }
    }

    reset() {
        this._elements.items.style.left = `-158px`
        this._elements.items.innerHTML = ''
        this._elements.result.innerHTML = this._elements.result.getAttribute('data-default')

        this.resetItems()
        this.duplicateItems()
        this.selectWinner()
        this.render()
    }

    finish() {
        this._elements.result.innerHTML = `You just won ${this._winner.item.name} (${this._winner.item.price} &euro;) with chance ${this._winner.item.chance}%`
        document.querySelector(`#item-${this._winner.index}`).className += ' winner'
    }

    selectWinner() {
        let itemsToSkip = this._originalItems.length * (this._rounds / 3)
        let items = this._items.slice(itemsToSkip)

        items = items.slice(0, items.length - itemsToSkip).map(item => {
            item.chanceInRounds = item.chance / (this._rounds / 3)

            return item
        })

        let chances = items.reduce((count, item) => {
            return count + item.chanceInRounds
        }, 0)

        let randomNumber = Math.floor(Math.random() * (chances * 100))
        let counter = 0

        for (let i = 0; i < items.length; i++) {
            counter += items[i].chanceInRounds * 100

            if (counter > randomNumber) {
                this._winner = {
                    index: itemsToSkip + i,
                    item: items[i]
                }

                break
            }
        }

        return this
    }

    start() {
        let duration = 0
        let maxDuration = this._config.duration * 1000
        let left = 0
        let finalLeft = 210 * (this._winner.index - 1.157)
        let leftIncrement = finalLeft / (maxDuration / 10)

        let Animate = () => {
            window.setTimeout(() => {
                this._elements.items.style.left = `-${left}px`

                left += leftIncrement;
                duration += 10

                if (duration < maxDuration) {
                    Animate()
                } else {
                    this.finish()
                }
            }, 10)
        }

        Animate()
    }
}
