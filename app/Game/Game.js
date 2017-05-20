import Support from './Support';

export default class Game {
    constructor(ItemsCollection, config) {
        this._originalItems = Support.shuffleArray(ItemsCollection.items)
        this._items = []
        this._winner = null
        this._rounds = 10

        this._config = {
            duration: 3
        }

        this.elements = {
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

        this._items = Support.shuffleArray(this._items)
    }

    render() {
        for (let i = 0; i < this._items.length; i++) {
            let item = this._items[i]

            this.elements.items.innerHTML += `<li class="item" id="item-${i}">${item.name}<span>${item.price} &euro;</span></li>`
        }
    }

    reset() {
        this.elements.items.style.left = `-158px`
        this.elements.items.innerHTML = ''
        this.elements.result.innerHTML = this.elements.result.getAttribute('data-default')

        this.resetItems()
        this.duplicateItems()
        this.selectWinner()
        this.render()
    }

    finish() {
        this.elements.result.innerHTML = `You just won ${this._winner.item.name} (${this._winner.item.price} &euro;) with chance ${this._winner.item.chance}%`
        document.querySelector(`#item-${this._winner.index}`).className += ' winner'
    }

    selectWinner() {
        let itemsToSkip = this._originalItems.length * (this._rounds / 3)
        let items = this._items.slice(itemsToSkip)

        items = items.slice(0, items.length - itemsToSkip).map(item => {
            item.chanceInRounds = item.chance / (this._rounds / 3)

            return item
        })

        let chances = Support.sumObjectsKeyValues(items, 'chanceInRounds')
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
        let ItemWidth = 210
        let Duration = 0
        let MaxDuration = this._config.duration * 1000
        let Left = 0
        let FinalLeft = ItemWidth * (this._winner.index - 1.157)
        let LeftIncrement = FinalLeft / (MaxDuration / 10)

        let Animate = () => {
            window.setTimeout(() => {
                this.elements.items.style.left = `-${Left}px`

                Left += LeftIncrement;
                Duration += 10

                if (Duration < MaxDuration) {
                    Animate()
                } else {
                    this.finish()
                }
            }, 10)
        }

        Animate()
    }
}
