import { guestInstance, authInstance } from './index.js'

/*
 * Создание, обновление и удаление категории, получение списка всех категорий
 */
export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category)
    return data
}

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`)
    return data
}

export const fetchCategories = async () => {
    const { data } = await guestInstance.get('category/getall')
    return data
}

export const fetchCategory = async (id) => {
    const { data } = await guestInstance.get(`category/getone/${id}`)
    return data
}

/*
 * Создание, обновление и удаление страны, получение списка всех стран
 */
export const createCountry = async (country) => {
    const { data } = await authInstance.post('country/create', country)
    return data
}

export const updateCountry = async (id, country) => {
    const { data } = await authInstance.put(`country/update/${id}`, country)
    return data
}

export const deleteCountry = async (id) => {
    const { data } = await authInstance.delete(`country/delete/${id}`)
    return data
}

export const fetchCountries = async () => {
    const { data } = await guestInstance.get('country/getall')
    return data
}

export const fetchCountry = async (id) => {
    const { data } = await guestInstance.get(`country/getone/${id}`)
    return data
}

/*
 * Создание, обновление и удаление тура, получение списка всех туров
 */
export const createTour = async (tour) => {
    const { data } = await authInstance.post(`tour/create`, tour)
    return data
}

export const updateTour = async (id, tour) => {
    const { data } = await authInstance.put(`tour/update/${id}`, tour)
    return data
}

export const deleteTour = async (id) => {
    const { data } = await authInstance.delete(`tour/delete/${id}`)
    return data
}

export const fetchAllTours = async (categoryId = null, countryId = null, page = 1, limit = 3) => {
    let url = `tour/getall`
    // фильтрация туров по категории и/или стране
    if (categoryId) url = url + '/categoryId/' + categoryId
    if (countryId) url = url + '/countryId/' + countryId
    const { data } = await guestInstance.get(
        url,
        {params: { // GET-параметры для постраничной навигации
            page, limit
        }
    })
    return data
}

export const fetchOneTour = async (id) => {
    const { data } = await guestInstance.get(`tour/getone/${id}`)
    return data
}

export const fetchTourRating = async (id) => {
    const { data } = await guestInstance.get(`rating/tour/${id}`)
    return data
}

/*
 * Создание, обновление и удаление характеристик тура
 */
export const createProperty = async (tourId, property) => {
    const { data } = await authInstance.post(`tour/${tourId}/property/create`, property)
    return data
}

export const updateProperty = async (tourId, id, property) => {
    const { data } = await authInstance.put(`tour/${tourId}/property/update/${id}`, property)
    return data
}

export const deleteProperty = async (tourId, id) => {
    const { data } = await authInstance.delete(`tour/${tourId}/property/delete/${id}`)
    return data
}