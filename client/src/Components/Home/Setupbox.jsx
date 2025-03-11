import { Box, Button, Flex, Heading, Image, ScaleFade, Text } from '@chakra-ui/react'
import star from "../../Assets/star.png"
import Person from "../../Assets/Person.png"
import React from 'react'
import UpdateProfile from '../Profile.jsx/UpdateProfile'
import { Link } from 'react-router-dom'

const Setupbox = () => {

    const BoxStyle = {
        borderTop: '1px solid #664DFF',
        borderBottom: '3px solid #664DFF',
        boxShadow: '0px 0px 100px rgba(102, 77, 255, 0.2)',
        backdropFilter: 'blur(264px)',
        borderRadius: "42"
    };

    return <>

        <Box bg="#010314" display="flex" flexDirection="column" justifyContent="center" alignItems="center" color="white" >
            <Heading size="xl" textAlign="center" bgGradient='radial(#FFFFFF,#FFFFFF, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' bgClip='text' mt={10}>5 minute set-up process</Heading>
            <Text textAlign={"center"} color="#77798F" mt={5}>Just take 5 minutes to fill in some info, choose a killer template, and<br />bam! Your personalized portfolio website is ready.</Text>
            <ScaleFade initialScale={0.5} in={true}>

                <Box sx={BoxStyle} w="80vw" bg={"#010314"} display={"flex"} justifyContent="spaceBetween" alignItems="center" mt={10}>
                    <Box m={10}>
                        <Box border="1px solid #2A2B3A" borderRadius="50" bgGradient="linear(to-b, #010310, rgba(102, 51, 238, 0.4))">
                            {/* bgGradient='radial(rgba(0, 0, 0, 0.22) 22%, #6633EE 69%, #FFFFFF 100%)' */}
                            <Image src={Person} w={"90%"} mx={"auto"} />
                        </Box>
                    </Box>
                    <Box mx={10} mr={20}>
                        <Flex gap={2} alignItems={"center"} mb={2}>
                            <Image src={star} />
                            <Text letterSpacing={4} bgGradient='linear(to-br, #627FFF, #865BFF)' bgClip='text' fontSize="12px" fontWeight="700">How It Works</Text>
                        </Flex>
                        <Heading size="xl" bgGradient='radial(#FFFFFF,#FFFFFF, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' bgClip='text'>Complete Your Profile</Heading>
                        <Text color="#77798F" mt={5} maxW="600px" fontSize="xl">Just share your details, choose a template, and see your personal portfolio magically appear. Confirm or make any changes you like, and  Grab a special link to share your portfolio with everyone. Boost your online presence the easy way!</Text>
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
                            px={5}
                            py={5}
                            mt={5}
                            as={Link}
                            to="/update"
                        >
                            Complete Your Profile
                        </Button>
                    </Box>
                </Box>
            </ScaleFade>
        </Box>
    </>
}

export default Setupbox
