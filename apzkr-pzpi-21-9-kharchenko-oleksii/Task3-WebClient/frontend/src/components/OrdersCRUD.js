import React from 'react';
import BaseCRUD from './BaseCRUD';

const OrdersCRUD = () => {
    const fields = [
        { name: 'customerId', label: 'ID клієнта', type: 'text' },
        { name: 'shopId', label: 'ID магазину', type: 'text' },
        { name: 'totalAmount', label: 'Загальна сума', type: 'number' },
        { name: 'orderDate', label: 'Дата замовлення', type: 'date' },
        { name: 'status', label: 'Статус', type: 'text' }
    ];

    return (
        <BaseCRUD endpoint="orders" fields={fields} />
    );
};

export default OrdersCRUD;