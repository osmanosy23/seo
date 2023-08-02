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
  const navigate = useNavigate ();

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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle the successful sign-up
        setIsSubmitting(false);
        const user = userCredential.user;
        console.log("User signed up successfully:", user);
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Gallery Pro</h1>
          </div>
          <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
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
                  placeholder="password"
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
          <div className="text-center mt-6">
            { /* Replace <p> with <div> here */}
            <div>{galleryDescription}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;

