import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { galleryDescription } from './description';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isLogin, setIsLogin] = useState(false); // Added state for login mode
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state to track authentication
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const handleAuth = (event) => {
    event.preventDefault();

    // Prevent multiple form submissions
    if (isSubmitting) {
      return;
    }

    // Set the submission status to true
    setIsSubmitting(true);
    setSignupError(null);

    const auth = getAuth();
    console.log("Email:", email);
    console.log("Password:", password);

    const nicknameFromEmail = email.split('@')[0];
    const capitalizedNickname = nicknameFromEmail.charAt(0).toUpperCase() + nicknameFromEmail.slice(1);
    setNickname(capitalizedNickname); // Set the nickname state
    localStorage.setItem("nickname", capitalizedNickname);

    if (isLogin) {
      // Perform login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Handle successful login
          setIsSubmitting(false);
          const user = userCredential.user;
          console.log("User logged in successfully:", user);
          setIsAuthenticated(true); // Set isAuthenticated to true after successful login
          //navigate('/'); // Redirect to homepage after login
        })
        .catch((error) => {
          // Handle login errors
          setIsSubmitting(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error during login:", error);
          setSignupError("Failed login. Try again.");
          // Handle login error
        });
    } else {
      // Perform signup
      if (!nickname.trim()) {
        // If nickname is empty or only contains whitespaces, show an error message
        setIsSubmitting(false);
        setIsNicknameValid(false); // Set isNicknameValid to false to show the error message
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Handle the successful sign-up
          setIsSubmitting(false);
          const user = userCredential.user;
          console.log("User signed up successfully:", user);
          localStorage.setItem("nickname", nickname);
          setIsAuthenticated(true); // Set isAuthenticated to true after successful login
          //navigate('/');  // Replace '/homepage' with the correct path to your homepage
        })
        .catch((error) => {
          console.error("Error creating new user:", error);
          // Handle sign-up errors
          setIsSubmitting(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Sign-up error:", errorCode, errorMessage);
          setSignupError("Failed signup. Try again.");
        });
    }
  };

  if (isAuthenticated) {
    navigate('/');
    return null; // Return null to prevent rendering the signup form once the navigation occurs
  }

  return (
    <form onSubmit={handleAuth} name="authForm">
      <div className="text-center">
            <h1 className="text-5xl font-bold" style={{margin: '20px 0'}}>Gallery Pro 📸</h1>
          </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="flex flex-col md:flex-row"> {/* New container for signup and description */}          
          <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
            <div className="card-body">
              {!isLogin && (  // Show the nickname field only when not in login mode
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nickname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your nickname"
                    className={`input input-bordered ${isNicknameValid ? '' : 'input-error'}`}
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      setIsNicknameValid(true); // Reset the error when typing
                    }}
                  />
                  {!isNicknameValid && (
                    <p className="text-red-500 mt-1">Nickname is required for signup.</p>
                  )}
                </div>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Your email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Signup"}
                </button>
              </div>
              <div className="form-control mt-4">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                >
                  {isLogin ? "Switch to Signup" : "Switch to Login"}
                </button>
              </div>
              {signupError && <p className="text-red-500 mt-4">{signupError}</p>}
            </div>
          </div>
          <div className="md:ml-8 mt-6 md:mt-0 md:flex-1"> {/* Gallery description */}
              <div className="text-center md:text-left">
                <div>{galleryDescription}</div> {/* Move gallery description here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;

