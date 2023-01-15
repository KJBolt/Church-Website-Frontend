import React, { useEffect } from 'react';
import FirstSection from '../components/FirstSection';
import FourthSection from '../components/FourthSection';
import SecondSection from '../components/SecondSection';
import ThirdSection from '../components/ThirdSection';
import FifthSection from "../components/FifthSection";
import SixSection from "../components/SixSection";
import SeventhSection from "../components/SeventhSection";
import EightSection from "../components/EightSection";
import NinethSection from "../components/NinethSection";
import TenthSection from "../components/TenthSection";
import Footer from "../components/Footer";
import FooterExtra from "../components/FooterExtra";
import Arrow from "../components/Arrow";
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {logout} from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const user = useSelector((state) => state.user.currentUser); 
  const dispatch = useDispatch(logout());
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = () => {
      const currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken)

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        toast.error("Your session has expired. Please login to continue");
        setTimeout(() => {
          navigate('/login');
          dispatch(logout());
        }, 3000)
      } 
    }
    tokenExpiry()
  }, [user, dispatch, navigate])
  
  return (
    <>
      <ToastContainer autoClose={2000}/>
      <div style={{width:'100%', overflowX:'hidden'}}>
        <FirstSection  />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixSection />
        <SeventhSection />
        <EightSection />
        <NinethSection />
        <TenthSection />
        <Footer />
        <FooterExtra/>
        <Arrow/>
      </div>
    </>
  )
}

export default Home
