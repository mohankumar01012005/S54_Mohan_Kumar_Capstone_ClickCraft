import { Box, Button, Flex, Icon, IconButton, Image, Link, ScaleFade, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Portfolio from "../../Assets/portfolio.png"
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import axios from 'axios'

const YourPortfolios = ({ Data,user }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(Data.Likes);
    const [on, setOn] = useState(false)
    
    const toast = useToast()
    const BoxStyle = {
        borderTop: '1px solid #664DFF',
        borderBottom: '3px solid #664DFF',
        boxShadow: '0px 0px 15px rgba(102, 77, 255, 0.2)',
        backdropFilter: 'blur(100px)',
        borderRadius: "20"
    }
    const iconHover = {
        transform: "scale(1.1)"
    }


    const display = () => {
        setOn(!on)
    }
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(Data.View);
            toast({
                title: 'Link Copied',
                status: 'success',
                isClosable: true,
            })
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };


    const handlePortfolioLike = async () => {
        try {
            if (isLiked) {
                await axios.put(`https://c-craft-server.vercel.app/user/portfolio/${user._id}/unlike?view=${Data.View}`);
                setLikesCount(likesCount - 1);
            } else {
                await axios.put(`https://c-craft-server.vercel.app/user/portfolio/${user._id}/like?view=${Data.View}`);
                setLikesCount(likesCount + 1);
            }
    
            setIsLiked(!isLiked);
    
            const storedPortfolios = localStorage.getItem('storedPortfolios') ? JSON.parse(localStorage.getItem('storedPortfolios')) : [];
            if (isLiked) {
                localStorage.setItem('storedPortfolios', JSON.stringify(storedPortfolios.filter(id => id !== Data.View)));
            } else {
                localStorage.setItem('storedPortfolios', JSON.stringify([...storedPortfolios, Data.View]));
            }
        } catch (error) {
            console.error('Error updating portfolio like:', error);
        }
    };    

    useEffect(() => {
        const storedPortfolios = localStorage.getItem('storedPortfolios') ? JSON.parse(localStorage.getItem('storedPortfolios')) : [];
        setIsLiked(storedPortfolios.includes(Data.View));
        setLikesCount(Data.Likes)
    }, [Data]);

    return (
        <Box sx={BoxStyle} w="24vw" bg={"#010314"} display={"flex"} justifyContent="center" flexDirection="column" px={4} py={4} color="white">
            <Box position={"relative"} >
                <Image src={Data.Image} borderRadius={"10px"} boxShadow='0px 0px 100px rgba(102, 77, 255, 0.2)' backdropBlur='blur(264)' cursor="pointer" _hover={{ transform: "scale(1.01)" }} onMouseEnter={display} />
                {on &&
                    <ScaleFade initialScale={1} in={true}>
                        <Box borderRadius="10" bgGradient="linear(to-b, #010310, rgba(102, 51, 238, 0.4))" w="100%" h={"100%"} position={"absolute"} top={0} display="flex" alignItems="center" justifyContent="center" onMouseLeave={display}>
                            <Box display={"flex"} justifyContent="center" alignItems="center" flexDirection="column" gap={4}>
                                <Button bg="#010314"
                                    size="md"
                                    color="white"
                                    border="3px solid #2A2B3A"
                                    borderRadius="10px"
                                    _hover={{
                                        bg: "#7241FF", border: "3px solid #7241FF", filter: "drop-shadow(0 0 5px rgba(114, 65, 255, 1))",
                                        transition: "all 0.3s ease"
                                    }}
                                    d={{ base: 'none', md: 'block' }}
                                    px={6}
                                    as={Link}
                                    textDecoration="none"
                                    href={Data.View}
                                    target='_blank'
                                >
                                    Open <ExternalLinkIcon ml={2} />
                                </Button>
                            </Box>
                        </Box>
                    </ScaleFade>
                }
            </Box>

            <Box display="flex" justifyContent="space-around" alignItems="center" w="100%" mt={5}>
                <Button bg="#010314"
                    size="md"
                    color="white"
                    border="3px solid #7241FF"
                    borderRadius="10px"
                    style={{
                        filter: "drop-shadow(0 0 3px rgba(114, 65, 255, 1))",
                        transition: "all 0.3s ease",
                    }}
                    _hover={{ bg: "#7241FF" }}
                    px={4}
                    onClick={handleCopy}
                >
                    Copy Link
                </Button>
                <Box display="flex" justifyContent="space-around" alignItems="center" >
                    <IconButton bg="transparent" color="#e31b23" minW={"25px"} h="25px" _hover={iconHover} m={1} _active={{ bg: "#010310" }} onClick={() => handlePortfolioLike()}>
                        {isLiked ? <FaHeart size="20px" /> : <FaRegHeart size="20px" />}
                    </IconButton>
                    <Text fontWeight="500" fontSize="16px">{likesCount}</Text>
                </Box>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                    <Box m={1}>

                        <IoEyeSharp size="25px" />
                    </Box>
                    <Text fontWeight="500" fontSize="16px">{Data.Views}</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default YourPortfolios
