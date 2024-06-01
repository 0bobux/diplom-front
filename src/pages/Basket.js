/*import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Table } from 'react-bootstrap'
import BasketItem from '../components/BasketItem.js'
import { observer } from 'mobx-react-lite'

const BasketList = observer(() => {
    const { basket } = useContext(AppContext)
    return (
        <>
            {basket.count ? (
                <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Сумма</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.tours.map(item => <BasketItem key={item.id} {...item} />)}
                        <tr>
                            <th colSpan="3">Итого</th>
                            <th>{basket.sum}</th>
                            <th>руб.</th>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </>
    )
})

export default BasketList*/

import BasketList from '../components/BasketList.js'
import { Container } from 'react-bootstrap'

const Basket = () => {
    return (
        <Container>
            <h1>Корзина</h1>
            <BasketList />
        </Container>
    )
}

export default Basket