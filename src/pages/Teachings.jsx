import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import SundayTeachings from '../components/TeachingsContent/SundayTeachings';
import Videos from '../components/Videos';
import Arrow from "../components/Arrow";
import Audio from '../components/Audio/Audio';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {logout} from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Teachings() {
  const user = useSelector((state) => state.user.currentUser); 
  const dispatch = useDispatch(logout());
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = () => {
      const currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken)

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        toast.error("Your session has expired. Please login to continue exploring the website");
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
      <ToastContainer />
      <div>
          <Navbar />
          <SundayTeachings />
          <Videos />
          <Audio />
          <Arrow/>
      </div>
    </>
  )
}

export default Teachings