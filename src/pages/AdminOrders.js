import { useState, useEffect } from 'react'
import { adminGetAll as getAllOrders } from '../http/orderAPI.js'
import { Button, Container, Spinner, Alert } from 'react-bootstrap'
import Orders from '../components/Orders.js'
import CreateOrder from '../components/CreateOrder.js'

const AdminOrders = () => {
    const [orders, setOrders] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllOrders()
            .then(
                data => {
                    console.log("Fetched orders from API in AdminOrders:", data);
                    setOrders(data);
                }
            )
            .catch(error => {
                console.error("Error fetching orders in AdminOrders:", error);
                setError(error);
            })
            .finally(
                () => setFetching(false)
            )
    }, [])

    if (fetching) {
        return <Spinner animation="border" />
    }

    if (error) {
        return <Alert variant="danger">Ошибка при загрузке заказов: {error.message}</Alert>;
    }

    return (
        <Container>
            <h1>Все заказы</h1>
            <Button onClick={() => setShow(true)}>Создать заказ</Button>
            <CreateOrder show={show} setShow={setShow} />
            <Orders items={orders} admin={true} />
        </Container>
    )
}

export default AdminOrders