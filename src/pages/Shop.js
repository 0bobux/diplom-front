import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import CountryBar from '../components/CountryBar.js'
import TourList from '../components/TourList.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchCategories, fetchCountries, fetchAllTours } from '../http/catalogAPI.js'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'

const getSearchParams = (searchParams) => {
    let category = searchParams.get('category')
    if (category && /[1-9][0-9]*/.test(category)) {
        category = parseInt(category)
    }
    let country = searchParams.get('country')
    if (country && /[1-9][0-9]*/.test(country)) {
        country = parseInt(country)
    }
    let page = searchParams.get('page')
    if (page && /[1-9][0-9]*/.test(page)) {
        page = parseInt(page)
    }
    return {category, country, page}
}

const Shop = observer(() => {
    const { catalog } = useContext(AppContext)

    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [countriesFetching, setCountriesFetching] = useState(true)
    const [toursFetching, setToursFetching] = useState(true)

    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        fetchCategories()
            .then(data => catalog.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchCountries()
            .then(data => catalog.countries = data)
            .finally(() => setCountriesFetching(false))

        const {category, country, page} = getSearchParams(searchParams)
        catalog.category = category
        catalog.country = country
        catalog.page = page ?? 1

        fetchAllTours(catalog.category, catalog.country, catalog.page, catalog.limit)
            .then(data => {
                catalog.tours = data.rows
                catalog.count = data.count
            })
            .finally(() => setToursFetching(false))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const {category, country, page} = getSearchParams(searchParams)

        if (category || country || page) {
            if (category !== catalog.category) {catalog.category = category}
            if (country !== catalog.country) {catalog.country = country}
            if (page !== catalog.page) {catalog.page = page ?? 1}
        } else  {
            catalog.category = null
            catalog.country = null
            catalog.page = 1
        }
        // eslint-disable-next-line
    }, [location.search])

    useEffect(() => {
        setToursFetching(true)
        fetchAllTours(catalog.category, catalog.country, catalog.page, catalog.limit)
            .then(data => {
                catalog.tours = data.rows
                catalog.count = data.count
            })
            .finally(() => setToursFetching(false))
    // eslint-disable-next-line
}, [catalog.category, catalog.country, catalog.page])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3} className="mb-3">
                    {categoriesFetching ? (
                        <Spinner animation="border" />
                    ) : (
                        <CategoryBar />
                    )}
                </Col>
                <Col md={9}>
                    <div>
                        {countriesFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <CountryBar />
                        )}
                    </div>
                    <div>
                        {toursFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <TourList />
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop