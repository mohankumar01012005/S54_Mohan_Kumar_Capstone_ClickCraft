import { Box, IconButton, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { FaAmazon, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    const iconHover = {
        color: "#7241FF",
        transform: "scale(1.3)"
    }
    return (
        <Box bg="#010310" color="#77798F" py={"20px"} px="10vw" display="flex" justifyContent="space-between" alignItems="center" boxShadow="inset 0px 4px 4px rgba(114, 65, 255, 0.5)">
            <Text>© 2024 Click Craft. All rights reserved.</Text>
            <Box display="flex" alignItems="center">
                <IconButton bg="#010310" color="#77798F" minW={"25px"} h="25px" _hover={iconHover} as={Link} href='https://github.com/Yagna123k' target='blank'><FaGithub size="20px" /></IconButton>
                <IconButton bg="#010310" color="#77798F" minW={"35px"} h="25px" _hover={iconHover} as={Link} href='https://www.linkedin.com/in/yagna-kusumanchi-799732237' target='blank'><FaLinkedin size="20px" /></IconButton>
                <IconButton bg="#010310" color="#77798F" minW={"35px"} h="25px" _hover={iconHover} as={Link} href='https://amzn.eu/d/5eWC9jL' target='blank'><FaAmazon size="20px" /></IconButton>
                <IconButton bg="#010310" color="#77798F" minW={"35px"} h="25px" _hover={iconHover} as={Link} href='https://www.instagram.com/yagna_kusumanchi/' target='blank'><FaInstagram size="20px" /></IconButton>
            </Box>
        </Box>
    )
}

export default Footer
