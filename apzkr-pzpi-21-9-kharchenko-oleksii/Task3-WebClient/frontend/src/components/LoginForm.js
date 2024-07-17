import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            toast({
                title: "Успішний вхід",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/admin');
        } catch (error) {
            toast({
                title: "Помилка входу",
                description: error.response?.data?.message || "Произошла ошибка",
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
                    <Heading as="h2" size="xl">Вхід</Heading>
                    <Input
                        type="email"
                        placeholder="Пошта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" colorScheme="blue">Войти</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default LoginForm;