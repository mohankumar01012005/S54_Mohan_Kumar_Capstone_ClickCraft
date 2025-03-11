import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import YourProfileMain from './YourProfileMain'

const YourProfile = () => {
  return (
    <Box bg="#010310">
        <Navbar/>
        <YourProfileMain/>
        <Footer/>
    </Box>
  )
}

export default YourProfile
