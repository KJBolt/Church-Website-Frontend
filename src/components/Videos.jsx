import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {publicRequest} from '../requestMethods';
import '../spinner.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Videos() {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const fetchVideos = async() => {
            try {
                setLoading(true);
                const res = await publicRequest.get('/video/all');
                setVideos(res.data)
                setLoading(false);
            } catch (error) {
                console.log(error)
            } 
        }

        fetchVideos();
    }, [])

    useEffect(() => {
        if (videos?.length !== 0) {
            setPageCount(videos?.pagination.pageCount)
        }
    }, [videos])

    // Pagination Logic
    const handlePrev = () => {
        setPage((p) => {
            if (p === 1) return p;
            return p - 1
        })
    }

    const handleNext = () => {
        setPage((p) => {
            if (p === pageCount) return p;
            return p + 1
        })
    }

  return (
    <>
        <ToastContainer autoClose={2000}/>
        <div>
            <div className='container'>
                <div className="st-wrapper">
                    <div className="title">
                        Videos
                    </div>

                    <div className="pagination-buttons">
                        <div>
                            <button disabled={page === 1} onClick={handlePrev}>Prev</button>
                            <button disabled={page >= pageCount} onClick={handleNext}>Next</button>
                        </div>
                    </div>
                    
                    {loading ? <div className="loader">Loading...</div> : <div className="st-content">
                        <div className="row">
                            {videos.items?.length === 0 ? <p className='no-content'>No Results found</p> :
                                <>
                                {videos.items?.map((teaching) => (
                                    <div className="video-content col-lg-4 col-md-3 col-sm-3 col-12" key={teaching._id}>
                                        <Link  to={`/teachings/videos/${teaching._id}`} style={{ textDecoration:'none', color:'black' }}>
                                            <div className="video-content-wrapper">
                                                <div className="video-image">
                                                    <p className='video-title'>{teaching.title}</p>
                                                    <img src={teaching.imgUrl} alt="" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                </>
                            }
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </>
  )
}

export default Videos