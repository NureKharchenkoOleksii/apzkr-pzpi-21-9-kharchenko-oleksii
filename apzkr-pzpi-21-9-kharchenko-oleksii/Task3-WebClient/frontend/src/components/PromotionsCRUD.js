import React from 'react';
import BaseCRUD from './BaseCRUD';

const PromotionsCRUD = () => {
    const fields = [
        { name: 'name', label: 'Назва', type: 'text' },
        { name: 'description', label: 'Опис', type: 'textarea' },
        { name: 'startDate', label: 'Дата початку', type: 'date' },
        { name: 'endDate', label: 'Дата закінчення', type: 'date' },
        { name: 'discountPercentage', label: 'Відсоток знижки', type: 'number' }
    ];

    return (
        <BaseCRUD endpoint="promotions" fields={fields} />
    );
};

export default PromotionsCRUD;