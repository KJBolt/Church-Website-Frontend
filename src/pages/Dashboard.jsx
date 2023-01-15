import React, {useEffect, useMemo, useState} from 'react';
import Navbar from "../components/Navbar";
import Home from "../components/Dashboard/Home";
import Chart from "../components/Dashboard/Chart";
import Details from "../components/Dashboard/Details";
import Sidebar from "../components/Dashboard/Sidebar";
import { userRequest } from '../requestMethods';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {logout} from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [userStats, setUserStats] = useState([]);
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

    const MONTH = useMemo(() => [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ], []);

    useEffect(() => {
        const fetchUserStats = async() => {
            try {
                const res = await userRequest.get('/user/stats');
                res.data.map((item) => 
                setUserStats(prev => [...prev, {name:MONTH[item._id - 1], 'Active User': item.total}])
            )
            } catch (error) {
                toast.error(error.response.status === 500 && "Network Error. Check connection and try again")
            }
            
        }

        fetchUserStats()
    }, [MONTH])

    return (
        <div>
            <Navbar/>
            <ToastContainer autoClose={2000}/>

            <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="row">
                        <div className="left col-md-3 col-sm-12 col-12">
                            <Sidebar/>
                        </div>
                        <div className="right col-md-9 col-sm-12 col-12">
                            <Home />
                            <Chart data={userStats} title='New Users Analytics' />
                            <Details/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;