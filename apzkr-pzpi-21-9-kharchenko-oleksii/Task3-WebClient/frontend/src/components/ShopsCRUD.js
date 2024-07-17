import React from 'react';
import BaseCRUD from './BaseCRUD';

const ShopsCRUD = () => {
    const fields = [
        { name: 'name', label: 'Назва', type: 'text' },
        { name: 'category', label: 'Категорія', type: 'text' },
        { name: 'location', label: 'Місцезнаходження', type: 'text' },
        { name: 'contactPerson', label: 'Контактна особа', type: 'text' },
        { name: 'phoneNumber', label: 'Номер телефону', type: 'text' },
        { name: 'email', label: 'Електронна пошта', type: 'email' },
        { name: 'openingHours.open', label: 'Час відкриття', type: 'time' },
        { name: 'openingHours.close', label: 'Час закриття', type: 'time' }
    ];

    return (
        <BaseCRUD endpoint="shops" fields={fields} />
    );
};

export default ShopsCRUD;