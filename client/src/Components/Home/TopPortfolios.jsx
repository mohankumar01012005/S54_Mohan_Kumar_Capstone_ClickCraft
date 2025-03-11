import { Box, HStack, Heading } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import TopPortfolioCard from './TopPortfolioCard'
import { AppContext } from '../../context/ParentContext'

const TopPortfolios = () => {
    const { templates } = useContext(AppContext)
    const [topTemplates, setTopTemplates] = useState([])
    useEffect(() => {
        setTopTemplates(templates.sort((a, b) => b.likes - a.likes).slice(0, 4))
    }, [templates])
    return (
        <>
            <Box bg="#010314" display="flex" flexDirection="column" justifyContent="center" alignItems="center" color="white" >
                <Heading size="xl" textAlign="center" bgGradient='radial(#FFFFFF,#FFFFFF, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' bgClip='text' my={20}>Top Rated Portfolios</Heading>
                    <Box display="flex" overflowX="auto" maxW={"80vw"} mx="auto" sx={{ '&::-webkit-scrollbar': { display: "none" } }} gap={5}>
                        {topTemplates.map((Data, i) => {
                            return <TopPortfolioCard Data={Data} key={i} />
                        })}
                    </Box>
            </Box>
        </>
    )
}

export default TopPortfolios
