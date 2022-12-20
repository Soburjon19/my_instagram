import React from 'react';
import Skeleton from "react-loading-skeleton";
import usePhotos from './../hooks/usePhotos';
import Post from './post/index';

const Timeline = () => {
    const { photos } = usePhotos();
    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                    <Skeleton count={1} width={640} height={400}className="mb-5"/>
                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => (
                    <Post key={content.docId} content={content}/>
                ))
            ) : (
                <p className="text-center text-2xl">
                    No Followers!   
                </p>
            )}
        </div>
    );
};

export default Timeline;
