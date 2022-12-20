import React, { useRef, useState, useEffect } from 'react';
import ArrowLeftSvg from './ArrowLeftSvg';
import CloseSvg from './CloseSvg';
import ConfirmCreatePost from './ConfirmCreatePost';
import UploadImage from './UploadImage';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

const CreatePost = ({ open, setOpen }) => {
    const [image, setImage] = useState(null);
    const [ confirmModal, setConfirmModal ] = useState(false);
    const imageInput = useRef(null);
    const postRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (postRef.current && !postRef.current.contains(event.target)) {
                setOpen(false);
                setConfirmModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [postRef]);


    const handleUpload = (event) => {
        setImage(event.target.files[0]);
        setConfirmModal(true);
    }

    const backToCreate = () => {
        setConfirmModal(false);
    }

    return (
        <>
        {open ? (
            <>
            <RemoveScrollBar />
            <div
                className="justify-center items-center flex overflow-hidden z-50 overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                <div
                    onClick={() => setOpen(false)}
                    className="absolute top-5 right-5 cursor-pointer">
                    <CloseSvg/>
                </div>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div ref={postRef} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-center text-center p-2 border-b border-solid border-slate-200 rounded-t">
                        {confirmModal && (
                            <div className="absolute left-2 cursor-pointer" onClick={backToCreate}>
                                <ArrowLeftSvg/>
                            </div>
                        )}
                        <h3 className="text-lg font-medium">
                            Create Post
                        </h3>
                    </div>
                    {!confirmModal ? (
                        <UploadImage imageInput={imageInput} handleUpload={handleUpload}/>
                    ) : (
                        <ConfirmCreatePost image={image}/>
                    )}
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>
    );
};

export default CreatePost;
