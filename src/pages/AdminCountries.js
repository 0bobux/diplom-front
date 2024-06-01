import { useState, useEffect } from 'react'
import { fetchCountries, deleteCountry } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditCountry from '../components/EditCountry.js'

const AdminCountries = () => {
    const [countries, setCountries] = useState(null) // список загруженных стран
    const [fetching, setFetching] = useState(true) // загрузка списка стран с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id страны, который будем редактировать — для передачи в <EditCountry id={…} />
    const [countryId, setCountryId] = useState(0)

    const handleCreateClick = () => {
        setCountryId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setCountryId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteCountry(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Страна «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchCountries()
            .then(
                data => setCountries(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Страны</h1>
            <Button onClick={() => handleCreateClick()}>Добавить страну</Button>
            <EditCountry id={countryId} show={show} setShow={setShow} setChange={setChange} />
            {countries.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Редактировать
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>Список стран пустой</p>
            )}
        </Container>
    )
}

export default AdminCountries