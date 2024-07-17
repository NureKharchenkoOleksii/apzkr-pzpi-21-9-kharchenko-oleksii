import React from 'react';
import { VStack, Button } from '@chakra-ui/react';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const sections = [
        { id: 'shops', name: 'Магазини' },
        { id: 'employees', name: 'Працівники' },
        { id: 'products', name: 'Товари' },
        { id: 'customers', name: 'Клієнти' },
        { id: 'orders', name: 'Замовлення' },
        { id: 'promotions', name: 'Акції' },
        { id: 'rentals', name: 'Оренда' },
        { id: 'parking', name: 'Паркування' }
    ];

    return (
        <VStack spacing={4} align="stretch" width="200px" p={4} bg="gray.100">
            {sections.map(section => (
                <Button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    colorScheme={activeSection === section.id ? "blue" : "gray"}
                    variant={activeSection === section.id ? "solid" : "ghost"}
                >
                    {section.name}
                </Button>
            ))}
        </VStack>
    );
};

export default Sidebar;