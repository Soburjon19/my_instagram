import React, { useState, useEffect } from 'react';
import { getUserByUsername } from './../../services/firebase';

const ModalComments = ({ comment, redirect, setComments }) => {
    const [ user, setUser ] = useState({});

    const getUser = async () => {
        const [ result ] = await getUserByUsername(comment.displayName.toLowerCase());
        setUser(result);
    }

    useEffect(() => {
        getUser();
    }, [])


    return (
        <div className="flex mb-4">
            <div className="flex items-center">
                <div className="flex-auto w-8 cursor-pointer"
                    onClick={() => redirect(comment.displayName)}>
                    <div className="w-8 h-8">
                        {user && (
                            <>
                            <img className="w-full h-full rounded-full"
                                src={user?.avatarSrc} alt=""/>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <p className="ml-2">
                        <span className="font-bold cursor-pointer"
                            onClick={() => redirect(comment.displayName)}>
                            { comment.displayName }
                        </span>
                        {" "}{ comment.comment }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalComments;
