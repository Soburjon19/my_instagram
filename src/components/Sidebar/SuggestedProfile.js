import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateLoggedInUserFollowing } from "../../services/firebase";
import { updateFollowedUserFollowers } from "./../../services/firebase";

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  profileImage,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  };
  console.log(profileImage);
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-full border-2 border-sky-600">
          <img className="p-[1.5px] border-red-500 rounded-full w-full h-full"
            src={profileImage} alt=""/>
        </div>
        <Link className="ml-2" to={`/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button className="text-xs font-semibold py-1 px-4 rounded-full bg-blue-600 text-white"
          type="button" onClick={handleFollowUser}>
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

export default SuggestedProfile;
