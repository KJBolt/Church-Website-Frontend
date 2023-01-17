import React from 'react';
import {steachings} from "../Data";

function PhotoGallery() {
    return (
        <>
            <div className='photo-gallery'>
            <h5>Photo Gallery</h5>

                <div className="pg-container">
                    <div className="row">
                        {steachings.map((data) => (
                            <div key={data.id} className='pg-imageWrapper col-lg-4 col-md-6 col-sm-12 col-12'>
                                <div className="pg-image " >
                                    <img src={data.image} alt=""/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhotoGallery;