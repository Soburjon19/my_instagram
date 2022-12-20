import React, { useContext, useState } from 'react';
import UserContext from './../../context/user';
import FirebaseContext from './../../context/firebase';

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext);
    const [ toggleLiked, setToggleLiked ] = useState(likedPhoto);
    const [ likes, setLikes ] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    }

    return (
        <>
        <div className="flex justify-between p-4">
            <div className="flex">
                <svg onClick={handleToggleLiked} xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" tabIndex={0}
                    className={`w-10 mr-4 select-none cursor-pointer ${
                        toggleLiked ? "fill-red-500 text-red-500" : "text-black"
                    }`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <svg onClick={handleFocus} xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    className="w-10 text-black-light select-none cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
                </svg>
            </div>
        </div>
        <div className="p-4 py-0">
            <p className="font-bold">
                {likes === 1 ? `${likes} like` : `${likes} likes`}
            </p>
        </div>
        </>
    );
};

export default Actions;
