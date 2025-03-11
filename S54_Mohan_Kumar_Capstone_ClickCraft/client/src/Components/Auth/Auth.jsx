import { Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Auth = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  useEffect(()=>{
    console.log(user)
    console.log(isAuthenticated)
  },[user])

  return (
    <>
      <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center" bg="#010314">
        <Button
          bg="#010314"
          size="lg"
          color="white"
          border="3px solid #7241FF"
          borderRadius="40px"
          style={{
            filter: "drop-shadow(0 0 10px rgba(114, 65, 255, 1))",
            transition: "background-color 0.3s ease", 
          }}
          _hover={{ bg: "#7241FF"}}
          onClick={() => loginWithRedirect()}
        >
          Get Started
        </Button>
      </Box>
    </>
  );
};

export default Auth;
