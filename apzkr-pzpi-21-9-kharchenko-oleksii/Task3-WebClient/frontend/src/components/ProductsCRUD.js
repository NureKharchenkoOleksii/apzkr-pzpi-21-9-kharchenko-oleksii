import React from 'react';
import BaseCRUD from './BaseCRUD';

const ProductsCRUD = () => {
    const fields = [
        { name: 'name', label: 'Назва', type: 'text' },
        { name: 'description', label: 'Опис', type: 'textarea' },
        { name: 'price', label: 'Ціна', type: 'number' },
        { name: 'category', label: 'Категорія', type: 'text' },
        { name: 'shopId', label: 'ID магазину', type: 'text' },
        { name: 'stock', label: 'Кількість на складі', type: 'number' }
    ];

    return (
        <BaseCRUD endpoint="products" fields={fields} />
    );
};

export default ProductsCRUD;