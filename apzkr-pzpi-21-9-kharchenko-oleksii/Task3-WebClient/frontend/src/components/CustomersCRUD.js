import React from 'react';
import BaseCRUD from './BaseCRUD';

const CustomersCRUD = () => {
    const fields = [
        { name: 'firstName', label: 'Ім\'я', type: 'text' },
        { name: 'lastName', label: 'Прізвище', type: 'text' },
        { name: 'email', label: 'Пошта', type: 'email' },
        { name: 'phoneNumber', label: 'Номер телефону', type: 'text' },
        { name: 'loyaltyPoints', label: 'Рахунок лояльності', type: 'number' }
    ];

    return (
        <BaseCRUD endpoint="customers" fields={fields} />
    );
};

export default CustomersCRUD;