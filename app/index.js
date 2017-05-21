import Item from './Game/Item';
import Game from './Game/Game';

let Items = [
    new Item('Car', 30000, 3),
    new Item('MacBook', 2400, 7),
    new Item('GoPRO Camera', 500, 9),
    new Item('LG Display', 150, 14),
    new Item('Book', 10, 22),
    new Item('Pen', 0.10, 45),
]

let GameInstance = new Game(Items)

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
