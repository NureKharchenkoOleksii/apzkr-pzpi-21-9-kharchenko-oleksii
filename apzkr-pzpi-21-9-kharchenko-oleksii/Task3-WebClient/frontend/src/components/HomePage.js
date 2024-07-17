import React from 'react';
import { ChakraProvider, Box, Flex, Spacer, Heading, Text, Button, VStack, Image, Container } from '@chakra-ui/react';
import main_photo from '../images/main_photo.jpg';
import automatization_photo from '../images/automatization.png';
import analytics_photo from '../images/analytics.jpg';
import rent_photo from '../images/rent.jpg';

const HomePage = () => {
    return (
        <Box>
            <Container maxW="container.xl" pt={10}>
                <Flex direction={{ base: "column", md: "row" }} align="center">
                    <Box flex={1} mr={{ base: 0, md: 10 }} mb={{ base: 10, md: 0 }}>
                        <Heading as="h2" size="2xl" mb={5}>
                            Програмна система організації роботи торгового центру
                        </Heading>
                        <Text fontSize="xl" mb={8}>
                            Ефективне управління та оптимізація роботи вашого торгового центру. Наша система допоможе вам підвищити продуктивність та збільшити прибуток.
                        </Text>
                        <Button colorScheme="teal" size="lg">
                            Дізнатися більше
                        </Button>
                    </Box>
                    <Box flex={1}>
                        <Image src={main_photo} alt="Торговий центр" borderRadius="lg" />
                    </Box>
                </Flex>

                <VStack spacing={10} mt={20}>
                    <Heading as="h3" size="xl">Наші переваги</Heading>
                    <Flex direction={{ base: "column", md: "row" }} justify="space-between" w="full">
                        {[
                            { title: 'Автоматизація процесів', image: automatization_photo },
                            { title: 'Аналітика продажів', image: analytics_photo },
                            { title: 'Управління орендою', image: rent_photo }
                        ].map((feature) => (
                            <Box key={feature.title} textAlign="center" p={5} flex={1}>
                                <Image src={feature.image} alt={feature.title} mb={4} mx="auto" />
                                <Text fontWeight="bold" fontSize="lg">{feature.title}</Text>
                            </Box>
                        ))}
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );
};

export default HomePage;