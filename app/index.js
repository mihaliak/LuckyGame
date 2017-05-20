import Item from './Game/Item';
import ItemsCollection from './Game/ItemsCollection';
import Game from './Game/Game';

let Car = new Item('Car', 30000, 3)
let Mac = new Item('MacBook', 2400, 7)
let Camera = new Item('GoPRO Camera', 500, 9)
let Display = new Item('LG Display', 150, 14)
let Book = new Item('Book', 10, 22)
let Pen = new Item('Pen', 0.10, 45)

let Items = new ItemsCollection().addItem(Car)
                                 .addItem(Mac)
                                 .addItem(Camera)
                                 .addItem(Display)
                                 .addItem(Book)
                                 .addItem(Pen)

let GameConfig = {
    duration: 3
}

let GameInstance = new Game(Items, GameConfig)

let Reset = false

document.querySelector('.start').addEventListener('click', () => {
	if (Reset) {
		GameInstance.reset()
	} else {
		Reset = true
	}

    GameInstance.start()
})

document.querySelector('.reset').addEventListener('click', () => {
    GameInstance.reset()
})
