import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import PortfolioCard from './PortfolioCard'
import { AppContext } from '../../context/ParentContext'
import UpdateProfile from '../Profile.jsx/UpdateProfile'

const PortfolioCards = () => {
  const {templates} = useContext(AppContext)
  return (
    <Box w="80vw" display="flex" justifyContent="left" alignItems="center" gap={10} flexWrap="wrap" mx="auto" my={10}>
      {
        templates?.map((Data, i)=>{
          return <PortfolioCard Data={Data} key={i}/>
        })
      }
    </Box>
  )
}

export default PortfolioCards
