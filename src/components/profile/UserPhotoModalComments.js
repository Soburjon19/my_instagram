import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ModalComments from './ModalComments';

const UserPhotoModalComments = ({ photo, setShowModal }) => {
    const [ comments, setComments ] = useState(photo.comments);
    const navigate = useNavigate();

    const redirectToUserProfile = (username) => {
        setShowModal(false);
        navigate(`/${username}`);
    }

    useEffect(() => {
        setComments(photo.comments);
    }, [photo.comments]);

    return (
        <div className="flex flex-col">
            {comments.map((comment, index) => (
                <ModalComments key={index} comment={comment} redirect={redirectToUserProfile} setComments={setComments}/>
            ))}
        </div>
    );
};

export default UserPhotoModalComments;
