import React, { useState } from 'react';
import { Box, Flex, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ShopsCRUD from './ShopsCRUD';
import EmployeesCRUD from './EmployeesCRUD';
import ProductsCRUD from './ProductsCRUD';
import CustomersCRUD from './CustomersCRUD';
import OrdersCRUD from './OrdersCRUD';
import PromotionsCRUD from './PromotionsCRUD';
import RentalsCRUD from './RentalsCRUD';
import ParkingCRUD from './ParkingCRUD';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('shops');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const renderSection = () => {
        switch(activeSection) {
            case 'shops':
                return <ShopsCRUD />;
            case 'employees':
                return <EmployeesCRUD />;
            case 'products':
                return <ProductsCRUD />;
            case 'customers':
                return <CustomersCRUD />;
            case 'orders':
                return <OrdersCRUD />;
            case 'promotions':
                return <PromotionsCRUD />;
            case 'rentals':
                return <RentalsCRUD />;
            case 'parking':
                return <ParkingCRUD />;
            default:
                return <Text>Выберите раздел</Text>;
        }
    };

    return (
        <Flex>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <Box flex={1} p={8}>
                <VStack spacing={6} align="stretch">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading as="h1" size="xl">Адмін-панель</Heading>
                        <Button colorScheme="red" onClick={handleLogout}>Выйти</Button>
                    </Flex>
                    {renderSection()}
                </VStack>
            </Box>
        </Flex>
    );
};

export default AdminPanel;