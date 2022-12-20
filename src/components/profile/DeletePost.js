import React from 'react';

const UserPhotoModalPost = ({ setShowModal, deletePost }) => {


    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                style={{zIndex: 60}}>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-md shadow relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="relative flex-auto w-72">
                            <div className="border-b flex justify-center px-2 py-2 text-red-500 font-semibold"
                                onClick={deletePost}>
                                <button>Delete Post</button>
                            </div>
                            <div className="flex justify-center px-2 py-2"
                                onClick={() => setShowModal(false)}>
                                <button>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 z-10 fixed inset-0 bg-black" style={{zIndex: 55}}></div>
        </>
    );
};

export default UserPhotoModalPost;
