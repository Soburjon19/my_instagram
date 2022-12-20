import { firebase, FieldValue } from "../lib/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export const doesUsernameExist = async (username) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    return result.docs.map((user) => user.data.length > 0);
}

export const getUserByUserId = async (userId) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));


    return user;
}

export const getSuggestedProfiles = async (userId, following) => {
    let query = firebase.firestore().collection('users');

    if (following.length > 0) {
        query = query.where('userId', 'not-in', [...following, userId]);
    } else {
        query = query.where('userId', '!=', userId);
    }
    const result = await query.limit(10).get();

    const profiles = result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));

    return profiles;
}

export const updateLoggedInUserFollowing = async (loggedInUserDocId, profileId, isFollowingProfile) => {
    return await firebase
        .firestore()
        .collection("users")
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}


export const updateFollowedUserFollowers = async (profileDocId, loggedInUserDocId, isFollowingProfile) => {
    return await firebase
        .firestore()
        .collection("users")
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export const getPhotos = async (userId, following) => {
    const result = await firebase
        .firestore()
        .collection("photos")
        .where("userId", "in", following)
        .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }))


    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }

            const [user] = await getUserByUserId(photo.userId);
            const { username } = user;
            return { username, ...photo, userLikedPhoto, avatarSrc: user.avatarSrc };
        })
    )

    return photosWithUserDetails;
}

export const getUserByUsername = async (username) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}

export const getUserPhotosByUsername = async (username) => {
    const [ user ] = await getUserByUsername(username);
    const result = await firebase
        .firestore()
        .collection("photos")
        .where("userId", "==", user.userId)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}


export const isUserFollowingProfile = async (username, profileUserId) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .where("following", "array-contains", profileUserId )
        .get();

    const [ response = {} ] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;
}

export const toggleFollow = async (
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId) => {
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}


export const addPostToFirestore = async (caption, imageSrc, userId, imageId) => {
    const result = await firebase
        .firestore()
        .collection("photos")
        .add({
            caption,
            comments: [],
            dateCreated: Date.now(),
            imageSrc,
            likes: [],
            photoId: imageId,
            userId
        })

    return result;
}

export const updateAvatarUser = async (imageSrc, userUid) => {
    const [ user ] = await getUserByUserId(userUid);


    return await firebase
        .firestore()
        .collection("users")
        .doc(user.docId)
        .update({
            avatarSrc: imageSrc
        });
}

export const updateUser = async (email, username, aboutMe, fullname, docId) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .doc(docId)
        .update({
            email,
            fullname,
            username,
            aboutMe
        })

    return result;
}

export const getPhotosByPhotoId = async (userId, photoId) => {
    const result = await firebase
        .firestore()
        .collection("photos")
        .where("photoId", "==", photoId)
        .get();


    const userFollowedPhotos = {
        ...result.docs[0].data(),
        docId: result.docs[0].id
    }


    const photosWithUserDetails = async () => {
        let userLikedPhoto = false;

        if (userFollowedPhotos.likes.includes(userId)) {
            userLikedPhoto = true;
        }

        const [user] = await getUserByUserId(userFollowedPhotos.userId);
        const { username } = user;
        return { username, ...userFollowedPhotos, userLikedPhoto, avatarSrc: user.avatarSrc };
    }

    return photosWithUserDetails()
}

export const getAllUsers = async () => {
    const result = await firebase
        .firestore()
        .collection("users")
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}

export const deletePhotoByDocId = async (photoDocId) => {
    const db = getFirestore();

    const docRef = doc(db, "photos", photoDocId);

    await deleteDoc(docRef);
}
