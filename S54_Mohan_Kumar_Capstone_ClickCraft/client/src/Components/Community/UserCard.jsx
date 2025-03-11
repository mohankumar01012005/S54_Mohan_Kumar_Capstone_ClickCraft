import {
    Box,
    Text,
    Stack,
    Avatar,
    IconButton,
} from '@chakra-ui/react';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const UserCard = ({ user }) => {
    const iconHover = {
        transform: "scale(1.1)"
    }
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(user.likes);

    const handleUserLike = async () => {
        try {
            if (isLiked) {
                await axios.put(`http://localhost:3001/user/${user._id}/unlike`);
                setLikesCount(likesCount - 1);
            } else {
                await axios.put(`http://localhost:3001/user/${user._id}/like`);
                setLikesCount(likesCount + 1);
            }

            setIsLiked(!isLiked);

            const storedUsers = localStorage.getItem('storedUsers') ? JSON.parse(localStorage.getItem('storedUsers')) : [];
            if (isLiked) {
                localStorage.setItem('storedUsers', JSON.stringify(storedUsers.filter(id => id !== user._id)));
            } else {
                localStorage.setItem('storedUsers', JSON.stringify([...storedUsers, user._id]));
            }
        } catch (error) {
            console.error('Error updating user like:', error);
        }
    };

    useEffect(() => {
        const storedUsers = localStorage.getItem('storedUsers') ? JSON.parse(localStorage.getItem('storedUsers')) : [];
        setIsLiked(storedUsers.includes(user._id));
        setLikesCount(user.likes)
    }, [user._id]);

    return (

        <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={2}
            mb={5}
            justifyContent="center"
            color="white"
            alignItems={"center"}
        >
            
            <Stack
                maxW="345px"
                boxShadow="lg"
                rounded="md"
                border="1px solid #664DFF"
                p={6}
                pb={3}
                pos="relative"
                bg={"#010320"}
                mr={5}
            >
                <Stack
                direction="column"
                spacing={2}
                p={2}
                justifyContent="flex-end"
                alignItems="center"
                as={Link}
                to={`/user/?id=${user.UserId}`}
                cursor={'pointer'}
            >
                <Avatar
                    size="lg"
                    showBorder={true}
                    borderColor="#664DFF"
                    name="avatar"
                    src={user.picture}
                />
                <Box textAlign="center">
                    <Text fontWeight="600" fontSize="md">
                        {user.name}
                    </Text>
                </Box>
            </Stack>
                <Text fontWeight="400" fontSize="16px" color="#77798F">
                    {user.profile.shortBio.length>20?user.profile.shortBio.slice(0,75) + "...":user.profile.shortBio}
                </Text>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text>Portfolios: <span style={{ fontWeight: "bold" }}>{user.portfolios.length}</span></Text>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                        <Box display="flex" justifyContent="space-around" alignItems="center" >
                            <IconButton bg="transparent" color="#e31b23" minW={"25px"} h="25px" _hover={iconHover} m={1} _active={{ bg: "#010310" }} onClick={() => handleUserLike()}>
                                {isLiked ? <FaHeart size="20px" /> : <FaRegHeart size="20px" />}

                            </IconButton>
                            <Text fontWeight="500" fontSize="16px">{likesCount}</Text>
                        </Box>
                        <Box display="flex" justifyContent="space-around" alignItems="center">
                            <Box m={2}>

                                <IoEyeSharp size="25px" />
                            </Box>
                            <Text fontWeight="500" fontSize="16px">{user.views}</Text>
                        </Box>
                    </Box>

                </Box>
            </Stack>
        </Stack>
    );
};

export default UserCard;