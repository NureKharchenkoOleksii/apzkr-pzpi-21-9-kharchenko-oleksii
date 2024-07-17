import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, VStack, Heading, Text, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/auth/register', {
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            });
            toast({
                title: "Успішна реєстрація",
                description: "Тепер ви можете авторизуватися в систему",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        } catch (error) {
            toast({
                title: "Помилка реєстрації",
                description: error.response?.data?.message || "Відбулась помилка",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxWidth="400px" margin="auto">
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <Heading as="h2" size="xl">Реєстрація</Heading>
                    <input
                        type="text"
                        placeholder="Ім'я"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Прізвище"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Номер телефону"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" colorScheme="blue">Зареєструватися</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default RegisterForm;