import React, { useContext, useState, useRef } from 'react';
import SmileSvg from './../createPost/SmileSvg';
import UserContext from './../../context/user';
import { getPhotosByPhotoId } from '../../services/firebase';
import FirebaseContext from './../../context/firebase';
import { formatDistance } from 'date-fns';
import { EMOJISCHAR } from '../../helpers/Emojis';

const FooterModal = ({ post, setPost }) => {
    const { user } = useContext(UserContext);
    const [ toggleLiked, setToggleLiked ] = useState(post.userLikedPhoto);
    const [ likes, setLikes ] = useState(post?.likes?.length);
    const [ comment, setComment ] = useState('');
    const [ emoji, setEmoji ] = useState(false);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const commentInput = useRef(null);
    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection("photos")
            .doc(post.docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(user.uid) : FieldValue.arrayUnion(user.uid)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    }

    const addComment = async () => {
        const comments = [...post.comments, { comment, displayName: user.displayName}];

        setPost({ ...post, comments });
        await firebase
            .firestore()
            .collection("photos")
            .doc(post.docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName: user.displayName, comment })
            });

        return setComment('');
    }

    const handleFocus = () => commentInput.current.focus();


    return (
        <>
            <div className="flex border-t">
                <div className="flex ml-2 mt-1">
                    <div>
                        <svg onClick={handleToggleLiked} xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" tabIndex={0}
                            className={`w-8 mr-4 select-none cursor-pointer ${
                                toggleLiked ? "fill-red-500 text-red-500" : "text-black"
                            }`}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </div>
                    <div>
                        <svg onClick={handleFocus} xmlns="http://www.w3.org/2000/svg"  fill="none"
                            viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                            className="w-8 text-black-light select-none cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="ml-2 my-2">
                <div className="flex ">
                    <p className="font-bold">
                        {likes === 1 ? `${likes} like` : `${likes} likes`}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 uppercase" style={{fontSize: "11px"}}>
                        { formatDistance(post.dateCreated, Date.now()) } ago
                    </p>
                </div>
            </div>
            <div className="flex items-center border justify-between relative">
                <div className="pl-1" onClick={() => setEmoji(prev => !prev)}>
                    <SmileSvg/>
                
                {emoji && (
                    <div className="absolute bg-white max-h-sm border rounded"
                        style={{bottom: "40px"}}>
                        <div className="grid max-h-40 overflow-auto grid-cols-12 p-1">
                            {EMOJISCHAR.map(emoji => (
                                <div className="hover:bg-slate-300 p-1 cursor-pointer"
                                    onClick={() => setComment(`${comment}${emoji}`)}>
                                    <span>{ emoji }</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>
                <div className="w-full">
                    <input
                        value={comment} onChange={e => setComment(e.target.value)} ref={commentInput}
                        className="text-sm text-gray-base w-full mr-3 py-3   px-2 comment-input"
                        placeholder="Add comment..."/>
                </div>
                <div>
                    <button
                        className="text-blue-500 border-2 text-sm font-bold text-sm rounded-xl text-blue w-14 h-8"
                        onClick={addComment}>
                    Post
                    </button>
                </div>
            </div>
        </>
    );
};

export default FooterModal;
