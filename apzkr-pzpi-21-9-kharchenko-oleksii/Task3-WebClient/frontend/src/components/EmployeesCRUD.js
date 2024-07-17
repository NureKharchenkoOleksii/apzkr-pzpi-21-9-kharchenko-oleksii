import React from 'react';
import BaseCRUD from './BaseCRUD';

const EmployeesCRUD = () => {
    const fields = [
        { name: 'firstName', label: "Ім'я", type: 'text' },
        { name: 'lastName', label: 'Прізвище', type: 'text' },
        { name: 'position', label: 'Посада', type: 'text' },
        { name: 'shopId', label: 'ID магазину', type: 'text' },
        { name: 'contactNumber', label: 'Контактний номер', type: 'text' },
        { name: 'email', label: 'Електронна пошта', type: 'email' },
        { name: 'hireDate', label: 'Дата прийому на роботу', type: 'date' }
    ];

    return (
        <BaseCRUD endpoint="employees" fields={fields} />
    );
};

export default EmployeesCRUD;