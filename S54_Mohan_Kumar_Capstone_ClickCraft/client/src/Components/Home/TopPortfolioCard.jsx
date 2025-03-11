import { Box, Button, Flex, Heading, Image, Link, ScaleFade, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import star from "../../Assets/star.png"
// import portfolio from "../../Assets/portfolio.png"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { AppContext } from '../../context/ParentContext'
import { useNavigate } from "react-router-dom";


const TopPortfolioCard = ({ Data }) => {
    const { userProfile, setUserProfile, isAuthenticated } = useContext(AppContext)

    const navigate = useNavigate();

    const [on, setOn] = useState(false)

    const display = () => {
        setOn(!on)
    }

    const AddPortfolio = async () => {
        try {
            if(!isAuthenticated){
                navigate('/login')
                return
            }
            if (userProfile) {
                const existingPortfolio = userProfile.portfolios.find(portfolio => portfolio.View == `${Data.Link}?id=${userProfile.UserId}`);
                if (existingPortfolio) {
                    navigate('/update')
                    return
                }
            }

            const response = await axios.put('https://c-craft-server.vercel.app/user/update', {
                email: userProfile.email,
                portfolio: {
                    View: `${Data.Link}?id=${userProfile.UserId}`,
                    Image: Data.Image,
                    Likes: 0,
                    Views: 0
                }
            })
            setUserProfile(response.data.user)
            navigate('/update')
        } catch (error) {
            console.error('Error updating portfolio:', error);
        }
    }

    const BoxStyle = {
        borderTop: '1px solid #664DFF',
        borderBottom: '3px solid #664DFF',
        borderRadius: "10"
    }

    return (
        <Box sx={BoxStyle} minW="25vw" bg={"#010314"} display={"flex"} justifyContent="center" flexDirection="column">
            <Box position={"relative"}>
                <Image src={Data.Image} borderRadius={10} backdropBlur='blur(264)' cursor="pointer" _hover={{ transform: "scale(1.01)" }} onMouseEnter={display} />
                {on &&
                    <ScaleFade initialScale={1} in={true}>
                        <Box border="1px solid #2A2B3A" borderRadius="10" bgGradient="linear(to-b, #010310, rgba(102, 51, 238, 0.4))" w="100%" h={"100%"} position={"absolute"} top={0} display="flex" alignItems="center" justifyContent="center" onMouseLeave={display}>
                            <Box display={"flex"} justifyContent="center" alignItems="center" flexDirection="column" gap={4}>
                                <Button bg="#010314"
                                    size="md"
                                    color="white"
                                    border="3px solid #2A2B3A"
                                    borderRadius="10px"
                                    _hover={{
                                        bg: "#7241FF", border: "3px solid #7241FF", filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                                        transition: "background-color 0.3s ease"
                                    }}
                                    d={{ base: 'none', md: 'block' }}
                                    px={8}
                                    as={Link}
                                    textDecoration="none"
                                    href={Data.Preview}
                                    target='_blank'
                                >
                                    Preview <ExternalLinkIcon ml={2} />
                                </Button>
                                <Button bg="#010314"
                                    size="md"
                                    color="white"
                                    border="3px solid #7241FF"
                                    borderRadius="10px"
                                    style={{
                                        filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    _hover={{ bg: "#7241FF" }}
                                    d={{ base: 'none', md: 'block' }}
                                    px={8}

                                    onClick={AddPortfolio}

                                >
                                    Customize
                                </Button>

                            </Box>
                        </Box>
                    </ScaleFade>}
            </Box>
        </Box>
    )
}

export default TopPortfolioCard
