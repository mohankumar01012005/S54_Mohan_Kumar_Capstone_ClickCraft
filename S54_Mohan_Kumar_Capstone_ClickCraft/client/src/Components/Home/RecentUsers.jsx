import { Box, Heading, Image } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/ParentContext'
import {Link} from "react-router-dom"

const RecentUsers = () => {
    const { users } = useContext(AppContext)
    const [recentUsers, setRecentUsers] = useState([])
    useEffect(() => {
        setRecentUsers(users.slice(0,10))
    }, [users])
    return (
        <Box bg="#010314" display="flex" flexDirection="column" justifyContent="center" alignItems="center" color="white">
            <Heading size="xl" textAlign="center" bgGradient='radial(#FFFFFF,#FFFFFF, rgba(255,255,255,0.7), rgba(255,255,255,0.7))' bgClip='text' mt={20}>Recent Users</Heading>
            <Box border="1px solid #2A2B3A" maxW="80vw" display="flex" justifyContent="center" alignItems="start" mx="auto" mt={5} py={4}>
                {
                    recentUsers.reverse().map((user, i) => {
                        return <Box key={i} w="100px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" as={Link} to={`/user/?id=${user.UserId}`}>
                            <Image src={user?.picture} border="2px solid #664DFF" borderRadius="50%" w="75px" height="75px" />
                        </Box>
                    })
                }
            </Box>
        </Box>
    )
}

export default RecentUsers
