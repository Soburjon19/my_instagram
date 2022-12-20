import React, { useRef } from 'react';
import Actions from './Actions';
import Header from './Header';
import Image from './Image';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({ content }) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    return (
        <div className="shadow-2xl rounded-xl col-span-4 border bg-white border-gray-primary mb-16">
            <Header username={content.username} avatarSrc={content.avatarSrc}/>
            <Image src={content.imageSrc} caption={content.caption}/>
            <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}/>
            <Footer caption={content.caption} username={content.username}/>
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}/>
        </div>
    );
};

export default Post;
