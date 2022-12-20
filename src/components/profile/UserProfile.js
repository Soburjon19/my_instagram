import React, { useReducer, useEffect, createContext } from 'react';
import { getUserPhotosByUsername } from './../../services/firebase';
import Header from './Header';
import Photos from './Photos';

export const UserProfileContext = createContext();

const UserProfile = ({ user }) => {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };

    const getProfileInfoAndPhotos = async () => {
        const photos = await getUserPhotosByUsername(user.username);
        dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length});
    }

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        getProfileInfoAndPhotos();
    }, [user])


    return (
        <UserProfileContext.Provider value={{ getProfileInfoAndPhotos }}>
            <Header photosCount={photosCollection ? photosCollection.length : 0} profile={profile}
                followerCount={followerCount} setFollowerCount={dispatch} user={user}/>
            <Photos photos={photosCollection}/>
        </UserProfileContext.Provider>
    );
};

export default UserProfile;
