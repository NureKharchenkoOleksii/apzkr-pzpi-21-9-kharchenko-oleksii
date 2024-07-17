import React from 'react';
import BaseCRUD from './BaseCRUD';

const ParkingCRUD = () => {
    const fields = [
        { name: 'spotNumber', label: 'Номер місця', type: 'text' },
        { name: 'isOccupied', label: 'Зайнято', type: 'checkbox' },
        { name: 'vehicleNumber', label: 'Номер автомобіля', type: 'text' },
        { name: 'entryTime', label: "Час в'їзду", type: 'datetime-local' },
        { name: 'exitTime', label: 'Час виїзду', type: 'datetime-local' }
    ];

    return (
        <BaseCRUD endpoint="parking" fields={fields} />
    );
};

export default ParkingCRUD;