import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { fetchOneTour, fetchTourRating } from '../http/catalogAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'

const Tour = () => {
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const [tour, setTour] = useState(null)
    const [rating, setRating] = useState(null)

    useEffect(() => {
        fetchOneTour(id).then(data => setTour(data))
        fetchTourRating(id).then(data => setRating(data))
    }, [id])

    const handleClick = (tourId) => {
        append(tourId).then(data => {
            basket.tours = data.tours
        })
    }

    if (!tour) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col lg={4}>
                    {tour.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + tour.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" />
                    )}
                </Col>
                <Col lg={8}>
                    <h1>{tour.name}</h1>
                    <h3>{tour.price}.00 руб.</h3>
                    <p>Страна: {tour.country.name}</p>
                    <p>Категория: {tour.category.name}</p>
                    <div>
                        {rating ? (
                            <p>Рейтинг: {rating.rating}, голосов {rating.votes}</p>
                        ) : (
                            <Spinner animation="border" />
                        )}
                    </div>
                    <Button onClick={() => handleClick(tour.id)}>Добавить в корзину</Button>
                </Col>
            </Row>
            {!!tour.props.length &&
                <Row>
                    <Col>
                        <h3>Характеристики</h3>
                        <Table bordered hover size="sm">
                            <tbody>
                                {tour.props.map(item => 
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Tour