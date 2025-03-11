import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    Link,
    Stack,
    IconButton,
    useDisclosure,
    Avatar
} from '@chakra-ui/react'

import { Link as Ln } from "react-router-dom"

import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/ParentContext'
import axios from "axios"



export default function Navbar({ tab }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [message, setMessage] = useState('')

    const { loginWithRedirect, isAuthenticated, user, logout, setUserProfile, userProfile, setUsers, setTemplates } = useContext(AppContext)

    const navLinks = [
        { name: 'Home', path: '/', status: tab == "Home" },
        { name: 'Portfolios', path: '/portfolios', status: tab == "Portfolios" },
        { name: 'Community', path: '/community', status: tab == "Community" },
    ]

    const fetchDataFromMongoDB = async (email) => {
        try {
            const response = await axios.get(`https://c-craft-server.vercel.app/user/verify?email=${email}`)
            return response.data
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('User not found error:', error.message)
                return null
            } else {
                console.error('Error fetching user data from MongoDB:', error.message)
                throw new Error('Internal Server Error')
            }
        }
    }

    const createUserInMongoDB = async (name, email, picture) => {
        try {
            const response = await axios.post('https://c-craft-server.vercel.app/user', {
                name,
                email,
                picture,
            })

            if (response.status === 201) {
                return response.data
            } else {
                throw new Error(response.data.error || 'Error creating user')
            }
        } catch (error) {
            console.error('Error creating user:', error.message)
            throw new Error('Internal Server Error')
        }
    }

    const HandleData = async () => {
        if (isAuthenticated && user) {
            try {
                const userData = await fetchDataFromMongoDB(user.email)
                if (userData) {
                    setUserProfile(userData)
                } else {
                    console.log("Creating new user")
                    const newUser = await createUserInMongoDB(user.name, user.email, user.picture)
                    setUserProfile(newUser)
                    setMessage('User created successfully')
                }
            } catch (error) {
                setMessage(error.message)
            }
        } else {
            setUserProfile(null)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://c-craft-server.vercel.app/user')
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching all users:', error.message)
        }
    }
    const fetchTemplates = async () => {
        try {
            const response = await axios.get('https://c-craft-server.vercel.app/templates/all')
            setTemplates(response.data)
        } catch (error) {
            console.error('Error fetching all templates:', error.message)
        }
    }

    useEffect(() => {
        HandleData()
        fetchUsers()
        fetchTemplates()
    }, [user, isAuthenticated])


    return (
        <Box px={4} bg='#010314' mt={3}>
            <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
                <Flex color="white" fontWeight={700} fontSize="1.5em" gap={2}>
                    <Text >CLICK</Text>
                    <Text color='#7241FF'>CRAFT</Text>
                </Flex>
                <HStack spacing={8} alignItems="center"  ml={10}>
                    <HStack as="nav" spacing={6} d={{ base: 'none', md: 'flex' }} alignItems="center">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} {...link} onClose={onClose} status={link.status} />
                        ))}
                    </HStack>
                </HStack>
                {isAuthenticated ?

                    <Box display={"flex"} gap={4} alignItems="center">
                        <Ln to={"/profile"}>
                            <Avatar
                                as={Link}
                                border="3px solid #7241FF"
                                rounded="full"
                                src={userProfile?.picture}
                            />
                        </Ln>

                        <Button bg="#010314"
                            size="md"
                            color="white"
                            border="3px solid #2A2B3A"
                            borderRadius="20px"
                            _hover={{
                                bg: "#7241FF", border: "3px solid #7241FF", filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                                transition: "background-color 0.3s ease"
                            }}
                            d={{ base: 'none', md: 'block' }}
                            px={8}
                            onClick={logout}
                        >
                            Log out
                        </Button>
                    </Box> :
                    <Box display={"flex"} gap={4}>
                        <Button bg="#010314"
                            size="md"
                            color="white"
                            border="3px solid #2A2B3A"
                            borderRadius="20px"
                            _hover={{
                                bg: "#7241FF", border: "3px solid #7241FF", filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                                transition: "background-color 0.3s ease"
                            }}
                            d={{ base: 'none', md: 'block' }}
                            px={8}
                            onClick={() => loginWithRedirect()}
                        >
                            Sign in
                        </Button>
                        <Button bg="#010314"
                            size="md"
                            color="white"
                            border="3px solid #7241FF"
                            borderRadius="20px"
                            style={{
                                filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                                transition: "background-color 0.3s ease",
                            }}
                            _hover={{ bg: "#7241FF" }}
                            d={{ base: 'none', md: 'block' }}
                            px={8}
                            onClick={() => loginWithRedirect()}
                        >
                            Sign Up
                        </Button>

                    </Box>
                }
                <IconButton
                    size="md"
                    icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                    aria-label="Open Menu"
                    display="none"
                    d={{ base: 'inherit', md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
            </Flex>

            {isOpen ? (
                <Box pb={4} d={{ base: 'inherit', md: 'none' }}>
                    <Stack as="nav" spacing={2}>
                        {navLinks.map((link, index) => (
                            <NavLink key={index} {...link} onClose={onClose} />
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    )
}

const NavLink = ({ name, path, onClose, status }) => {
    return (
        <Ln to={path}>
            <Link
                lineHeight="inherit"
                _hover={{
                    textDecoration: 'none',
                    color: "#865BFF",
                    fontWeight:"700",
                    transition: "color 0.3s smooth"
                }}
                onClick={() => onClose()}
                color={status ? "#865BFF" : "#77798F"}
                fontWeight={status ? "700" : "500"}
                fontSize={"1.2em"}
            >

                {name}
            </Link>
        </Ln>

    )
}

// cloudnary