import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Box, Heading, Button } from '@chakra-ui/react';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
                    ТЦ Менеджер
                </Heading>
            </Flex>

            <Box>
                <Link to="/">
                    <Button variant="ghost" mr={3}>Головна</Button>
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/admin">
                            <Button variant="ghost" mr={3}>Адмін-панель</Button>
                        </Link>
                        <Button variant="solid" colorScheme="whiteAlpha" onClick={handleLogout}>Вийти</Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="ghost" mr={3}>Вхід</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="solid" colorScheme="whiteAlpha">Реєстрація</Button>
                        </Link>
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default Header;