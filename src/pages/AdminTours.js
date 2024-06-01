import { useState, useEffect } from 'react'
import { fetchAllTours, deleteTour } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap'
import CreateTour from '../components/CreateTour.js'
import UpdateTour from '../components/UpdateTour.js'

// количество туров на страницу
const ADMIN_PER_PAGE = 6

const AdminTours = () => {
    const [tours, setTours] = useState([]) // список загруженных туров
    const [fetching, setFetching] = useState(true) // загрузка списка туров с сервера
    const [createShow, setCreateShow] = useState(false) // модальное окно создания тура
    const [updateShow, setUpdateShow] = useState(false) // модальное окно редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id тура, который будем редактировать — для передачи в <UpdateTour id={…} />
    const [tour, setTour] = useState(null)

    // текущая страница списка туров
    const [currentPage, setCurrentPage] = useState(1)
    // сколько всего страниц списка туров
    const [totalPages, setTotalPages] = useState(1)

    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setTour(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteTour(id)
            .then(
                data => {
                    // если это последняя страница и мы удаляем на ней единственный
                    // оставшийся тур — то надо перейти к предыдущей странице
                    if (totalPages > 1 && tours.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Тур «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchAllTours(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setTours(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Туры</h1>
            <Button onClick={() => setCreateShow(true)}>Создать тур</Button>
            <CreateTour show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateTour id={tour} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {tours.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Фото</th>
                            <th>Категория</th>
                            <th>Страна</th>
                            <th>Цена</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&
                                    <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">фото</a>}
                                </td>
                                <td>{item.category?.name || 'NULL'}</td>
                                <td>{item.country?.name || 'NULL'}</td>
                                <td>{item.price}</td>
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
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p>Список туров пустой</p>
            )}
        </Container>
    )
}

export default AdminTours