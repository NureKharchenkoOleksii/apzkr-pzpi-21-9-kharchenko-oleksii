import React from 'react';
import BaseCRUD from './BaseCRUD';

const RentalsCRUD = () => {
    const fields = [
        { name: 'shopId', label: 'ID магазину', type: 'text' },
        { name: 'startDate', label: 'Дата початку', type: 'date' },
        { name: 'endDate', label: 'Дата закінчення', type: 'date' },
        { name: 'monthlyRate', label: 'Щомісячна плата', type: 'number' },
        { name: 'status', label: 'Статус', type: 'text' }
    ];

    return (
        <BaseCRUD endpoint="rentals" fields={fields} />
    );
};

export default RentalsCRUD;