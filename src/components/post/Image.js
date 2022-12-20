import React from 'react';

const Image = ({ src, caption }) => {
    return (
        <img className='float-center' src={src} alt={caption}/>
    );
};

export default Image;
