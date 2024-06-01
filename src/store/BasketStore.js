import { makeAutoObservable } from 'mobx'

class BasketStore {
    _tours = []

    constructor() {
        makeAutoObservable(this)
    }

    get tours() {
        return this._tours
    }

    get count() { // всего позиций в корзине
        return this._tours.length
    }

    get sum() { // стоимость всех туров корзины
        return this._tours.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    set tours(tours) {
        this._tours = tours
    }
}

export default BasketStore