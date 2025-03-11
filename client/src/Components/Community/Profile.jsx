import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import Footer from '../Home/Footer'
import ProfileMain from './ProfileMain'
import axios from "axios"

const Profile = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        let isMounted = true; // Flag to track if the component is mounted
    
        const getUserData = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const id = queryParams.get('id');
                const response = await axios.get(`https://c-craft-server.vercel.app/user/find/${id}`)
                if (isMounted && response.data) {
                    setData(response.data);
                }
                console.log("Data Fetched Successfully");
            } catch (error) {
                console.error("Error in getting data:", error);
            }
        }
    
        getUserData();
    
        return () => {
            isMounted = false;
        };
    }, []);
    
    return (
        <Box bg="#010310">
            <Navbar />
            <ProfileMain userProfile={data}/>
            <Footer />
        </Box>
    )
}

export default Profile
