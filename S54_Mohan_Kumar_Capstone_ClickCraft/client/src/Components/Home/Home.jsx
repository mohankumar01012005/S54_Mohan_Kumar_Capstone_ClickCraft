import React from 'react'
import Navbar from './Navbar'
import img from '../../Assets/bg.png'
import { Image } from '@chakra-ui/react'
import HeroContent from './HeroContent'
import Setupbox from './Setupbox'
import TopPortfolios from './TopPortfolios'
import RecentUsers from './RecentUsers'
import AboutInfo from './AboutInfo'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Navbar tab={"Home"}/>
      <HeroContent/>
      <Image src={img} h="auto" maxW={'100%'} mx={"auto"}/>
      <Setupbox/>
      <TopPortfolios/>
      <RecentUsers/>
      <AboutInfo/>
      <Footer/>
    </div>
  )
}

export default Home
