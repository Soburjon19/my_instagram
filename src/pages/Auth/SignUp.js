import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "./../../context/firebase";
import "./style.css";
import { HOME, LOGIN, FORGOTPASSWORD } from "./../../constants/routes";
import { doesUsernameExist } from "./../../services/firebase";

const SignUp = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await userResult.user.updateProfile({
            displayName: username,
          });

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
          });

          navigate(HOME);
        } catch (error) {
          setFullName("");
          setEmail("");
          setPassword("");
          setError(error.message);
        }
      } else {
        setError("A user with this name has already been created!");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex flex-col">
        <div className="border-[1px] border-black rounded p-4 mb-5 w-[25rem] ">
          <div className="w-full">
            <img
              src="/images/instatext.png"
              className="mt-2 mx-auto my-2 w-full max-w-[8rem] object-cover"
              alt="instagram"
            />
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <span className="mb-1 block">Username</span>
              <input
                type="text"
                aria-label="Enter your email username"
                placeholder=" Your Username"
                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <span className="mb-1 block">Full Name</span>
              <input
                type="text"
                aria-label=" Full name"
                placeholder=" Your Full Name"
                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <span className="mb-1 block">Email</span>
              <input
                type="text"
                aria-label="Your email address"
                placeholder=" Your Email"
                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <span className="mb-1 block">Password</span>
              <input
                type="password"
                aria-label="Enter your password"
                placeholder="Password(12345678)"
                className="text-xs p-3 mb-3 border-[1px] rounded bg-white w-full border-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-500  mt-4 cursor-pointer text-white rounded-2xl w-full h-8 font-bold ${
                  isInvalid && "opacity-50"
                }`}
              >
                Sign up
              </button>
            </div>
            <div className="text-center mt-3 ">
              <Link
                to={FORGOTPASSWORD}
                className="text-blue-500 font-semibold text-center w-full text-x font-thin my-3"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex justify-center items-center flex-col w-full p-4 border-gray-300">
          <p className="text-sm">
            Have an account?
            <Link to={LOGIN} className="font-semibold ml-1 text-blue-500">
              Log In
            </Link>
          </p>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
