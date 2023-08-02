import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { galleryDescription } from './description';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate ();

  const handleSignUp = (event) => {
    event.preventDefault();

    // Prevent multiple form submissions
    if (isSubmitting) {
      return;
    }

    // Set the submission status to true
    setIsSubmitting(true);

    const auth = getAuth();
    console.log("Email:", email);
    console.log("Password:", password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle the successful sign-up
        setIsSubmitting(false);
        const user = userCredential.user;
        console.log("User signed up successfully:", user);
        navigate('/');  // Replace '/homepage' with the correct path to your homepage
      })
      .catch((error) => {
        console.error("Error creating new user:", error);
        // Handle sign-up errors
        setIsSubmitting(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-up error:", errorCode, errorMessage);
        setSignupError("Failed. Try again.");
      });
  };

  return (
    <form onSubmit={handleSignUp} name="signupForm">
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
                  {isSubmitting ? "Signing up..." : "Signup"}
                </button>
                {signupError && <p className="text-red-500 mt-2">{signupError}</p>}
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p>{galleryDescription}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;

// const Signup = () => {
//   return (
//     <form>
//       <div className="hero min-h-screen bg-base-200">
//         <div className="hero-content flex-col">
//           <div className="text-center">
//             <h1 className="text-5xl font-bold">Gallery Pro</h1>
//           </div>
//           <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
//             <div className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input type="text" placeholder="email" className="input input-bordered" />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input type="text" placeholder="password" className="input input-bordered" />
//               </div>
//               <div className="form-control mt-6">
//                 <button className="btn btn-primary">Signup</button>
//               </div>
//             </div>
//           </div>
//           <div className="text-center mt-6">
//             <p>{galleryDescription}</p>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// const handleSignUp = (event) => {
//   event.preventDefault();

//   const email = event.target.email.value;
//   const password = event.target.password.value;

//   const auth = getAuth();

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Handle the successful sign-up, e.g., redirect to another page or show a success message.
//       const user = userCredential.user;
//       console.log("User signed up successfully:", user);
//     })
//     .catch((error) => {
//       // Handle sign-up errors, e.g., display error message to the user.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error("Sign-up error:", errorCode, errorMessage);
//     });
// };


// export default Signup;
