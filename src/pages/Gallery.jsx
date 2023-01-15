import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {steachings} from '../Data';
import Events from "../components/Events";
import PhotoGallery from "../components/PhotoGallery";
import Arrow from '../components/Arrow';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {logout} from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Gallery() {
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
    <div>
        <Navbar />
        <ToastContainer />

        <div className="swiper-container">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {steachings.map((image) => (
                    <SwiperSlide 
                        key={image.id} 
                    >
                        <img src={image.image} alt="Network Error" style={{height:'100%', width:'100%', objectFit:'cover'}} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        <div className="container">
            <div className="g-box">
                <div className="g-container shadow-sm">
                    <div className="row">
                        <div className="first col-md-4 col-sm-12 col-12">
                            <div className="wrapper">
                                <div className="title">
                                    <h3>Our Branches</h3>
                                </div>
                                <div className="image">
                                    <img src={require('../assets/pastor1.jpg')} alt=""/>
                                </div>
                                <div className="desc">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquid enim exercitationem itaque maxime non optio reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="first col-md-4 col-sm-12 col-12">
                            <div className="wrapper">
                                <div className="title">
                                    <h3>Church Mission</h3>
                                </div>
                                <div className="image">
                                    <img src={require('../assets/image1.jpg')} alt=""/>
                                </div>
                                <div className="desc">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquid enim exercitationem itaque maxime non optio reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="first col-md-4 col-sm-12 col-12">
                            <div className="wrapper">
                                <div className="title">
                                    <h3>Teachings</h3>
                                </div>
                                <div className="image">
                                    <img src={require('../assets/image2.jpg')} alt=""/>
                                </div>
                                <div className="desc">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquid enim exercitationem itaque maxime non optio reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Events />
                    <PhotoGallery />
                </div>
            </div>
        </div>

        <Arrow />
    </div>
    )
}

export default Gallery