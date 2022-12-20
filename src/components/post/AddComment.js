import React, { useState, useContext, useRef, useEffect } from 'react';
import { EMOJISCHAR } from '../../helpers/Emojis';
import FirebaseContext from './../../context/firebase';
import UserContext from './../../context/user';
import SmileSvg from './../createPost/SmileSvg';

const AddComment = ({ docId, comments, setComments, commentInput }) => {
    const [ comment, setComment ] = useState('');
    const emojiRef = useRef();
    const [ emoji, setEmoji ] = useState(false);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: { displayName }
    } = useContext(UserContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmoji(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{ displayName, comment }, ...comments]);
        setComment('');

        return firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    }

    return (
        <div className=" h-12 border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5 relative" method="POST"
                onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}>
                <div
                    className="flex items-center ml-3 cursor-pointer"
                    onClick={() => setEmoji(prev => !prev)}>
                    {emoji && (
                            <div className="absolute bg-white max-h-sm border rounded"
                                style={{top: "-160px"}} ref={emojiRef}>
                                <div className="grid max-h-40 overflow-auto grid-cols-12 p-1">
                                    {EMOJISCHAR.map(emoji => (
                                        <div className="hover:bg-blue-500 p-1 cursor-pointer"
                                            onClick={() => setComment(`${comment}${emoji}`)}>
                                            <span>{ emoji }</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    <svg fill="#000" height="25px" role="img" viewBox="0 0 24 24" width="15px">
                        <path
                            d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z">
                        </path>
                    </svg>
                </div>
                <input aria-label="Add a comment" autoComplete="off" className="h-11 text-sm w-full mr-3 py-5 px-2" type="text" name="AddComment"
                    placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} ref={commentInput}/>
                <button type="submit"
                    className="mt-2 border-2 w-20 rounded-xl text-sm font-bold text-blue-500">
                    Post
                </button>
            </form>
        </div>
    );
};

export default AddComment;
