import { makeAutoObservable } from 'mobx'

class CatalogStore {
    _categories = []
    _countries = []
    _tours = []
    _category = null // выбранная категория
    _country = null // выбранная страна
    _page = 1 // текущая страница
    _count = 0 // сколько всего туров
    _limit = 3 // туров на страницу

    constructor() {
        makeAutoObservable(this)
    }

    get categories() {
        return this._categories
    }

    get countries() {
        return this._countries
    }

    get tours() {
        return this._tours
    }

    get category() {
        return this._category
    }

    get country() {
        return this._country
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }

    set countries(countries) {
        this._countries = countries
    }

    set tours(tours) {
        this._tours = tours
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set country(id) {
        this.page = 1
        this._country = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore