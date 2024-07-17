import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Button, Table, Thead, Tbody, Tr, Th, Td,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, Select, Checkbox, useDisclosure
} from '@chakra-ui/react';

const BaseCRUD = ({ endpoint, fields }) => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/${endpoint}`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post(`http://localhost:8000/api/${endpoint}`, currentItem);
            fetchItems();
            onClose();
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8000/api/${endpoint}/${currentItem._id}`, currentItem);
            fetchItems();
            onClose();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/${endpoint}/${id}`);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const openModal = (item = {}) => {
        setCurrentItem(item);
        setIsEditing(!!item._id);
        onOpen();
    };

    const renderFormField = (field) => {
        switch (field.type) {
            case 'select':
                return (
                    <Select
                        value={currentItem[field.name] || ''}
                        onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                    >
                        {field.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Select>
                );
            case 'checkbox':
                return (
                    <Checkbox
                        isChecked={currentItem[field.name] || false}
                        onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.checked})}
                    />
                );
            case 'date':
                return (
                    <Input
                        type="date"
                        value={currentItem[field.name] || ''}
                        onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        value={currentItem[field.name] || ''}
                        onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                    />
                );
            default:
                return (
                    <Input
                        type={field.type || 'text'}
                        value={currentItem[field.name] || ''}
                        onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                    />
                );
        }
    };

    return (
        <Box>
            <Button onClick={() => openModal()} colorScheme="green" mb={4}>Створити</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {fields.map(field => <Th key={field.name}>{field.label}</Th>)}
                        <Th>Дії</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map(item => (
                        <Tr key={item._id}>
                            {fields.map(field => <Td key={field.name}>{item[field.name]}</Td>)}
                            <Td>
                                <Button onClick={() => openModal(item)} colorScheme="blue" mr={2}>Редагування</Button>
                                <Button onClick={() => handleDelete(item._id)} colorScheme="red">Видалення</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isEditing ? 'Редактировать' : 'Создать'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {fields.map(field => (
                            <FormControl key={field.name} mb={4}>
                                <FormLabel>{field.label}</FormLabel>
                                {renderFormField(field)}
                            </FormControl>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={isEditing ? handleUpdate : handleCreate}>
                            {isEditing ? 'Обновить' : 'Создать'}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default BaseCRUD;