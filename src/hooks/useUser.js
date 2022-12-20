import { useState, useContext, useEffect } from "react";
import { getUserByUserId } from "../services/firebase";
import UserContext from './../context/user';

export default function useUser() {
    const [ activeUser, setActiveUser ] = useState({});
    const { user } = useContext(UserContext);

    async function getUserObjByUserId() {
        const [response] = await getUserByUserId(user.uid);
        setActiveUser(response);
    }

    const updateProfile = () => {
        getUserObjByUserId();
    }

    useEffect(() => {
        if(user?.uid) {
            getUserObjByUserId();
        }
    }, [user])

    return { user: activeUser, updateProfile };
}
