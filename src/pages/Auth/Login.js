import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "./../../context/firebase";
import "./style.css";
import { HOME, SIGN_UP, FORGOTPASSWORD } from "./../../constants/routes";

const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(HOME);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex space-x-5 items-center">
        <div>
          <img src="/images/homebg.png" alt="home bg" className="max-w-[25rem] w-full"/>
        </div>
        <div className="flex flex-col">
          <div className="border-[1px] border-black rounded p-3 mb-10 w-80">
            <div className="w-full mb-5">
              <img src="/images/instatext.png" alt="instalogo" className="max-w-[9rem] block mx-auto"/>
            </div>
            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-3" method="post">
              <div>
                <span className="mb-1 block">Email account</span>
                <input type="text" aria-label="Your email address" placeholder="Your email account"
                  className="text-xs p-3 mb-3 border-[1px] border-gray-400 outline-none rounded bg-white w-full border-black"
                  value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div>
                <span className="mb-1 block">Password</span>
                <input type="password" aria-label="Your password" placeholder="Password"
                  className="text-xs p-3 mb-3 border-[1px] border-gray-400 outline-none rounded bg-white w-full border-black"
                  value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div>
                <button disabled={isInvalid} type="submit"
                  className={`bg-blue-500  mt-3 cursor-pointer text-white rounded-2xl w-full h-8 font-bold 
                  ${isInvalid && "opacity-50"}`}>
                  Log In
                </button>
              </div>
              <div className="text-center mt-3 ">
                ------------ OR ------------
              </div>
              <div className="text-center mt-3 ">
                <Link
                  to={FORGOTPASSWORD}
                  className="text-blue-500 font-semibold text-center w-full text-x font-thin my-3">
                  Forgot password?
                </Link>
              </div>
            <div className="flex justify-center items-center flex-col w-full p-4">
              <p className="text-sm">
                Don't have an account?
                <Link to={SIGN_UP} className="font-semibold ml-2 text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
