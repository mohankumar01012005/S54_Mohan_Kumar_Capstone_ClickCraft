import React from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import { Box, Heading, Select } from '@chakra-ui/react'
import PortfolioCards from './PortfolioCards'

const Portfolios = () => {
    return (
        <Box bg={"#010310"}>
            <Navbar tab={"Portfolios"}/>
            <Select w={"200px"} color="#7241FF" border="2px solid #7241FF" ml="auto" mr={10} mt={5}>
                <option value='option1' style={{backgroundColor:"#010310",color:"white"}} >All</option>
                <option value='option2' style={{backgroundColor:"#010310" ,color:"white"}}>Front-End Developer</option>
                <option value='option3' style={{backgroundColor:"#010310",color:"white"}}>Software Developer</option>
            </Select>
            <Heading size="xl" textAlign="center" bgGradient='radial(#FFFFFF,#FFFFFF, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' bgClip='text'>Portfolios</Heading>
            <PortfolioCards/>
            <Footer />
        </Box>
    )
}

export default Portfolios
