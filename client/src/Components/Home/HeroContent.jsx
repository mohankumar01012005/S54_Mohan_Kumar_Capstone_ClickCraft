import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import star from "../../Assets/star.png"
import play from "../../Assets/Play.png"

import React, { useContext } from 'react'
import { AppContext } from '../../context/ParentContext'
import { useNavigate } from 'react-router-dom'

const HeroContent = () => {
    const {isAuthenticated, loginWithRedirect} = useContext(AppContext)

    const navigate = useNavigate()
    return (
        <Box bg={"#010314"} display="flex" flexDirection="column" justifyContent="center" alignItems="center" color="white">
            <Flex mt={50} gap={2} alignItems={"center"}>
                <Image src={star} />
                <Text letterSpacing={4} bgGradient='linear(to-br, #627FFF, #865BFF)' bgClip='text' fontSize="12px" fontWeight="700">WELCOME TO CLICK CRAFT</Text>
            </Flex>
            <Heading size="2xl" textAlign="center" bgGradient='radial(#FFFFFF,#FFFFFF, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' bgClip='text' lineHeight="60px">Your Story, Your Way <br />Build Your Personal Portfolio</Heading>

            <Text color="#77798F" textAlign="center" mt={5}>Showcase your journey by crafting a personal portfolio in<br />minutes</Text>
            <Box display={"flex"} gap={6} alignItems="center" mt={5}>
                <Button bg="#010314"
                    size="lg"
                    color="white"
                    border="1px solid #7241FF"
                    borderRadius="40px"
                    style={{
                        filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                        transition: "background-color 0.3s ease",
                    }}
                    _hover={{ bg: "#7241FF" }}
                    d={{ base: 'none', md: 'block' }}
                    px={8}
                    py={5}
                    onClick={isAuthenticated?()=>navigate("/portfolios"):()=>loginWithRedirect()}
                >
                    Get started for free
                </Button>
                <Button bg="#010314"
                    size="lg"
                    color="white"
                    border="1px solid #2A2B3A"
                    borderRadius="40px"
                    _hover={{
                        bg: "#7241FF", border: "3px solid #7241FF", filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                        transition: "background-color 0.3s ease"
                    }}
                    d={{ base: 'none', md: 'block' }}
                    px={8}
                    py={5}
                >
                    <Image src={play} mr={3}></Image>Watch Video
                </Button>
            </Box>
        </Box>
    )
}

export default HeroContent
